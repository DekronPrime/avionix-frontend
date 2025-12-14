"use client";

import { useEffect, useState } from "react";
import { useLoader } from "../context/LoaderContext";
import { airlinesApi } from "../lib/api/airlines.api";
import { toast } from "sonner";
import z from "zod";
import { airlineSchema } from "../validation/airlineSchema";
import { Column } from "../types/admin";
import { airlineStatusColors } from "../constants/statuses/airlines";
import { Badge } from "../components/common/Badge";
import { filter } from "../utils/filter";
import { sort } from "../utils/sort";
import { AdminPanelTitle } from "../components/admin/AdminPanelTitle";
import { AdminToolbar } from "../components/admin/AdminToolbar";
import { StatusFilter } from "../components/admin/AdminToolbar/StatusFilter";
import { AdminTable } from "../components/admin/AdminTable";
import { AdminModalWindow } from "../components/admin/AdminModalWindow";
import Button from "../components/common/Button";
import { AirlineForm } from "../components/forms/AirlineForm";

import Airline from "@/public/icons/airline-light.png";
import EditItem from "@/public/icons/edit-item-light.png";
import Save from "@/public/icons/save-light.png";

type AirlineSchema = z.infer<typeof airlineSchema>;

export const AdminAirlinesPage = () => {
  const [sortField, setSortField] = useState<any>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc" | null>("asc");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalState, setModalState] = useState({
    open: false,
    type: "create" as "create" | "edit",
    item: null as any,
  });

  const [airlines, setAirlines] = useState<any[]>([]);
  const { setLoading } = useLoader();
  const [error, setError] = useState<string | null>(null);

  const fetchAirlines = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await airlinesApi.getAll();
      setAirlines(res.data);
    } catch (err) {
      setError("Failed to load airlines");
      toast.error("Failed to load airlines");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: AirlineSchema) => {
    try {
      setLoading(true);
      const payload = {
        ...data,
        countryId: Number(data.countryId),
      };

      await airlinesApi.create(payload);

      toast.success("Airline created successfully");
      await fetchAirlines();
      closeModal();
    } catch (err) {
      console.error("Failed to update airline", err);
      toast.error("Failed to create airline");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data: AirlineSchema) => {
    try {
      setLoading(true);
      const payload = {
        id: modalState.item.id,
        ...data,
        countryId: Number(data.countryId),
      };
      await airlinesApi.update(modalState.item.id, payload);

      toast.success("Airline updated successfully");
      await fetchAirlines();
      closeModal();
    } catch (err) {
      console.error("Failed to update airline", err);
      toast.error("Failed to update airline");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (status: string) => {
    if (!modalState.item) return;

    try {
      setLoading(true);

      if (status === "CLOSED") {
        await airlinesApi.delete(modalState.item.id);
      } else {
        await airlinesApi.updateStatus(modalState.item.id, { status });
      }

      setModalState((prev) => ({
        ...prev,
        item: { ...prev.item, status },
      }));
      toast.success("Airline status updated successfully");

      await fetchAirlines();
    } catch (e) {
      toast.error("Failed to update airline status");
      setError("Failed to update airline status");
    } finally {
      closeModal();
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAirlines();
  }, []);

  const columns: Column<any>[] = [
    { key: "id", title: "ID", sortable: true, width: "100px", align: "left" },
    { key: "name", title: "Name", sortable: true, align: "left" },
    { key: "iataCode", title: "IATA Code", sortable: true, align: "center" },
    { key: "country.name", title: "Country", sortable: true, align: "center" },
    {
      key: "status",
      title: "Status",
      sortable: false,
      align: "center",
      render: (status) => {
        const cfg = airlineStatusColors[status] ?? {
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

  const airlineSearchFields = ["name", "iataCode", "country.name"];

  const handleSearch = (v: string) => {
    setSearchQuery(v);
  };

  const filteredData = filter(
    airlines,
    selectedStatus,
    searchQuery,
    airlineSearchFields
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
      const res = await airlinesApi.getById(id);
      setModalState({
        open: true,
        type: "edit",
        item: { ...res.data, countryId: res.data.country?.id },
      });
    } catch {
      toast.error("Failed to load airline");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: AirlineSchema) => {
    if (modalState.type === "create") {
      handleCreate(data);
    } else {
      handleUpdate(data);
    }
  };

  return (
    <>
      <div className="p-6 bg-foreground flex flex-col gap-4 flex-1 justify-start items-center">
        <AdminPanelTitle title="Airlines Panel" icon={Airline} />
        <AdminToolbar
          entityType="airline"
          onCreate={() => openCreate()}
          onSearch={handleSearch}
          searchPlaceholder="Search airline (name, iata, country)..."
          filters={
            <StatusFilter
              value={selectedStatus}
              onChange={setSelectedStatus}
              statuses={Object.keys(airlineStatusColors)}
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
        title={modalState.type === "create" ? "Create Airline" : "Edit Airline"}
        statusBar={
          modalState.type === "edit" && modalState.item ? (
            <div className="flex justify-between items-center w-full">
              <div className="inline-flex items-center gap-2">
                <span className="text-sm text-black font-poppins font-semibold">
                  Airline Status:
                </span>
                <Badge
                  bgColor={airlineStatusColors[modalState.item.status].bg}
                  textColor={airlineStatusColors[modalState.item.status].text}
                  tooltip={airlineStatusColors[modalState.item.status].tooltip}
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
                    variant="modal"
                    size="sm"
                    onClick={() => handleStatusChange("ACTIVE")}
                    className="text-lg py-2 px-3"
                  >
                    Set ACTIVE
                  </Button>
                )}

                {modalState.item.status !== "SUSPENDED" && (
                  <Button
                    variant="modal"
                    size="sm"
                    onClick={() => handleStatusChange("SUSPENDED")}
                    className="text-lg py-2 px-3"
                  >
                    Set SUSPENDED
                  </Button>
                )}

                {modalState.item.status !== "BANKRUPT" && (
                  <Button
                    variant="modal"
                    size="sm"
                    onClick={() => handleStatusChange("BANKRUPT")}
                    className="text-lg py-2 px-3"
                  >
                    Set BANKRUPT
                  </Button>
                )}

                {modalState.item.status !== "CLOSED" && (
                  <Button
                    variant="modal"
                    size="sm"
                    onClick={() => handleStatusChange("CLOSED")}
                    className="text-lg py-2 px-3"
                  >
                    Set CLOSED
                  </Button>
                )}
              </div>
            )}
            {modalState.type === "create" ? (
              <Button
                type="submit"
                form="airline-form"
                icon={Save}
                iconSize={25}
                variant="submit"
                size="md"
                className="text-lg py-2 px-3 capitalize hover:bg-success"
              >
                Create Airline
              </Button>
            ) : (
              <Button
                type="submit"
                form="airline-form"
                icon={EditItem}
                iconSize={25}
                variant="submit"
                size="md"
                className="text-lg py-2 px-3 capitalize hover:bg-limited"
              >
                Update Airline
              </Button>
            )}
          </div>
        }
      >
        <AirlineForm
          type={modalState.type}
          item={modalState.item}
          onSubmit={onSubmit}
        />
      </AdminModalWindow>
    </>
  );
};
