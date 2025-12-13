"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { AdminPanelTitle } from "../components/admin/AdminPanelTitle";
import { AdminTable } from "../components/admin/AdminTable";
import { AdminToolbar } from "../components/admin/AdminToolbar";
import { StatusFilter } from "../components/admin/AdminToolbar/StatusFilter";
import { Badge } from "../components/common/Badge";
import Button from "../components/common/Button";
import { AirportForm } from "../components/forms/AirportForm";
import { AdminModalWindow } from "../components/admin/AdminModalWindow";
import { airportStatusColors } from "../constants/statuses/airports";
import { useLoader } from "../context/LoaderContext";
import { airportsApi } from "../lib/api/airports.api";
import { Column } from "../types/admin";
import { filter } from "../utils/filter";
import { sort } from "../utils/sort";
import { airportSchema } from "../validation/airportSchema";

import Airport from "@/public/icons/airport-light.png";
import EditItem from "@/public/icons/edit-item-light.png";
import Save from "@/public/icons/save-light.png";

type AirportSchema = z.infer<typeof airportSchema>;

export const AdminAirportsPage = () => {
  const [sortField, setSortField] = useState<any>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc" | null>("asc");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalState, setModalState] = useState({
    open: false,
    type: "create" as "create" | "edit",
    item: null as any,
  });

  const [airports, setAirports] = useState<any[]>([]);
  const { setLoading } = useLoader();
  const [error, setError] = useState<string | null>(null);

  const fetchAirports = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await airportsApi.getAll();
      setAirports(res.data);
    } catch (err) {
      setError("Failed to load airports");
      toast.error("Failed to load airports");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: AirportSchema) => {
    try {
      setLoading(true);
      const payload = {
        ...data,
        countryId: Number(data.countryId),
      };
      console.log(payload);

      await airportsApi.create(payload);

      toast.success("Airport created successfully");
      await fetchAirports();
      closeModal();
    } catch (err) {
      console.error("Failed to update airport", err);
      toast.error("Failed to create airport");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data: AirportSchema) => {
    try {
      setLoading(true);
      const payload = {
        id: modalState.item.id,
        ...data,
        countryId: Number(data.countryId),
      };
      await airportsApi.update(modalState.item.id, payload);

      toast.success("Airport updated successfully");
      await fetchAirports();
      closeModal();
    } catch (err) {
      console.error("Failed to update airport", err);
      toast.error("Failed to update airport");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (status: string) => {
    if (!modalState.item) return;

    try {
      setLoading(true);

      if (status === "CLOSED") {
        await airportsApi.delete(modalState.item.id);
      } else {
        await airportsApi.updateStatus(modalState.item.id, { status });
      }

      setModalState((prev) => ({
        ...prev,
        item: { ...prev.item, status },
      }));
      toast.success("Airport status updated successfully");

      await fetchAirports();
    } catch (e) {
      toast.error("Failed to update airport status");
      setError("Failed to update airport status");
    } finally {
      closeModal();
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAirports();
  }, []);

  const columns: Column<any>[] = [
    { key: "id", title: "ID", sortable: true, width: "100px", align: "left" },
    { key: "name", title: "Name", sortable: true, align: "left" },
    { key: "iataCode", title: "IATA Code", sortable: true, align: "center" },
    { key: "city", title: "City", sortable: true, align: "center" },
    { key: "country.name", title: "Country", sortable: true, align: "center" },
    {
      key: "status",
      title: "Status",
      sortable: false,
      align: "center",
      render: (status) => {
        const cfg = airportStatusColors[status] ?? {
          text: "text-gray-700",
          bg: "bg-gray-100",
          tooltip: "Unknown status",
        };

        return (
          <Badge textColor={cfg.text} bgColor={cfg.bg} tooltip={cfg.tooltip}>
            {status}
          </Badge>
        );
      },
    },
  ];

  const airportSearchFields = ["name", "city", "iataCode", "country.name"];

  const handleSearch = (v: string) => {
    setSearchQuery(v);
  };

  const filteredData = filter(
    airports,
    selectedStatus,
    searchQuery,
    airportSearchFields
  );
  const sortedData = sort(filteredData, sortField, sortDir);

  const onSort = (field: any) => {
    if (field === sortField) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const closeModal = () => {
    setModalState({ ...modalState, open: false });
  };

  function openCreate() {
    setModalState({ open: true, type: "create", item: null });
  }

  const openEdit = async (id: string) => {
    try {
      setLoading(true);
      const res = await airportsApi.getById(id);
      setModalState({
        open: true,
        type: "edit",
        item: { ...res.data, countryId: res.data.country?.id },
      });
    } catch {
      toast.error("Failed to load airport");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: AirportSchema) => {
    if (modalState.type === "create") {
      handleCreate(data);
    } else {
      handleUpdate(data);
    }
  };

  return (
    <>
      <div className="p-6 bg-foreground flex flex-col gap-4 flex-1 justify-start items-center">
        <AdminPanelTitle title="Airports Panel" icon={Airport} />
        <AdminToolbar
          onCreate={() => openCreate()}
          onSearch={handleSearch}
          searchPlaceholder="Search airport (name, iata, city, country)..."
          filters={
            <StatusFilter
              value={selectedStatus}
              onChange={setSelectedStatus}
              statuses={Object.keys(airportStatusColors)}
            />
          }
        />
        <AdminTable
          columns={columns}
          data={sortedData}
          onSort={(field) => onSort(field)}
          onRowClick={(row) => openEdit(row)}
          sortField={sortField}
          sortDirection={sortDir}
        />
      </div>
      <AdminModalWindow
        isOpen={modalState.open}
        type={modalState.type}
        onClose={() => setModalState({ ...modalState, open: false })}
        title={modalState.type === "create" ? "Create Airport" : "Edit Airport"}
        statusBar={
          modalState.type === "edit" && modalState.item ? (
            <div className="flex justify-between items-center w-full">
              <div className="inline-flex items-center gap-2">
                <span className="text-sm text-black font-poppins font-semibold">
                  Airport Status:
                </span>
                <Badge
                  bgColor={airportStatusColors[modalState.item.status].bg}
                  textColor={airportStatusColors[modalState.item.status].text}
                  tooltip={airportStatusColors[modalState.item.status].tooltip}
                >
                  {modalState.item.status}
                </Badge>
              </div>

              <div className="flex flex-col text-xs text-black font-semibold italic text-right">
                <div>
                  Created At:{" "}
                  <span className="font-bold">
                    {new Date(modalState.item.createdAt).toLocaleString()}
                  </span>
                </div>
                {modalState.item.createdAt !== modalState.item.updatedAt && (
                  <div>
                    UpdatedAt:{" "}
                    <span className="font-bold">
                      {new Date(modalState.item.updatedAt).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : null
        }
        footer={
          <div className="flex justify-end gap-3">
            {modalState.type === "edit" && modalState.item && (
              <div className="flex gap-2 mr-auto">
                {modalState.item.status !== "ACTIVE" && (
                  <Button
                    variant="submit"
                    size="sm"
                    onClick={() => handleStatusChange("ACTIVE")}
                    className="text-lg py-2 px-3 capitalize hover:bg-success"
                  >
                    Set ACTIVE
                  </Button>
                )}

                {modalState.item.status !== "INACTIVE" && (
                  <Button
                    variant="submit"
                    size="sm"
                    onClick={() => handleStatusChange("INACTIVE")}
                    className="text-lg py-2 px-3 capitalize hover:bg-danger"
                  >
                    Set INACTIVE
                  </Button>
                )}

                {modalState.item.status !== "MAINTENANCE" && (
                  <Button
                    variant="submit"
                    size="sm"
                    onClick={() => handleStatusChange("MAINTENANCE")}
                    className="text-lg py-2 px-3 capitalize hover:bg-limited"
                  >
                    Set MAINTENANCE
                  </Button>
                )}

                {modalState.item.status !== "CLOSED" && (
                  <Button
                    variant="submit"
                    size="sm"
                    onClick={() => handleStatusChange("CLOSED")}
                    className="text-lg py-2 px-3 capitalize hover:bg-black"
                  >
                    Set CLOSED
                  </Button>
                )}
              </div>
            )}
            {modalState.type === "create" ? (
              <Button
                type="submit"
                form="airport-form"
                icon={Save}
                iconSize={25}
                variant="submit"
                size="md"
                className="text-lg py-2 px-3 capitalize hover:bg-success"
              >
                Create Airport
              </Button>
            ) : (
              <Button
                type="submit"
                form="airport-form"
                icon={EditItem}
                iconSize={25}
                variant="submit"
                size="md"
                className="text-lg py-2 px-3 capitalize hover:bg-limited"
              >
                Update Airport
              </Button>
            )}
          </div>
        }
      >
        <AirportForm
          type={modalState.type}
          item={modalState.item}
          onSubmit={onSubmit}
        />
      </AdminModalWindow>
    </>
  );
};
