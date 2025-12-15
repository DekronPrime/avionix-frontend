"use client";

import z from "zod";
import { aircraftSchema } from "../validation/aircraftSchema";
import { useEffect, useState } from "react";
import { useLoader } from "../context/LoaderContext";
import { aircraftApi } from "../lib/api/aircraft.api";
import { toast } from "sonner";
import { Column } from "../types/admin";
import { aircraftStatusColors } from "../constants/statuses/aircraft";
import { Badge } from "../components/common/Badge";
import { filter } from "../utils/filter";
import { sort } from "../utils/sort";
import { AdminPanelTitle } from "../components/admin/AdminPanelTitle";

import Aircraft from "@/public/icons/aircraft-light.png";
import EditItem from "@/public/icons/edit-item-light.png";
import Save from "@/public/icons/save-light.png";
import { AdminToolbar } from "../components/admin/AdminToolbar";
import { StatusFilter } from "../components/admin/AdminToolbar/StatusFilter";
import { AdminTable } from "../components/admin/AdminTable";
import { AdminModalWindow } from "../components/admin/AdminModalWindow";
import Button from "../components/common/Button";
import { AircraftForm } from "../components/forms/AircraftForm";

type AircraftSchema = z.infer<typeof aircraftSchema>;

export const AdminAircraftPage = () => {
  const [sortField, setSortField] = useState<any>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc" | null>("asc");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalState, setModalState] = useState({
    open: false,
    type: "create" as "create" | "edit",
    item: null as any,
  });

  const [aircraft, setAircraft] = useState<any[]>([]);
  const { setLoading } = useLoader();
  const [error, setError] = useState<string | null>(null);

  const fetchAircraft = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await aircraftApi.getAll();
      setAircraft(res.data);
    } catch (err) {
      setError("Failed to load aircraft");
      toast.error("Failed to load aircraft");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: AircraftSchema) => {
    try {
      setLoading(true);
      const payload = {
        ...data,
        airlineId: Number(data.airlineId),
      };
      console.log(payload);

      await aircraftApi.create(payload);

      toast.success("Aircraft created successfully");
      await fetchAircraft();
      closeModal();
    } catch (err) {
      console.error("Failed to update aircraft", err);
      toast.error("Failed to create aircraft");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data: AircraftSchema) => {
    try {
      setLoading(true);
      const payload = {
        id: modalState.item.id,
        ...data,
        airlineId: Number(data.airlineId),
      };

      await aircraftApi.update(modalState.item.id, payload);

      toast.success("Aircraft updated successfully");
      await fetchAircraft();
      closeModal();
    } catch (err) {
      console.error("Failed to update aircraft", err);
      toast.error("Failed to update aircraft");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (status: string) => {
    if (!modalState.item) return;

    try {
      setLoading(true);

      if (status === "DECOMMISSIONED") {
        await aircraftApi.delete(modalState.item.id);
      } else {
        await aircraftApi.updateStatus(modalState.item.id, { status });
      }

      setModalState((prev) => ({
        ...prev,
        item: { ...prev.item, status },
      }));
      toast.success("Aircraft status updated successfully");

      await fetchAircraft();
    } catch (e) {
      toast.error("Failed to update aircraft status");
      setError("Failed to update aircraft status");
    } finally {
      closeModal();
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAircraft();
  }, []);

  const columns: Column<any>[] = [
    { key: "id", title: "ID", sortable: true, width: "100px", align: "left" },
    { key: "model", title: "Model", sortable: true, align: "left" },
    { key: "capacity", title: "Capacity", sortable: true, align: "center" },
    { key: "airline.name", title: "Airlines", sortable: true, align: "center" },
    {
      key: "status",
      title: "Status",
      sortable: false,
      align: "center",
      render: (status) => {
        const cfg = aircraftStatusColors[status] ?? {
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

  const aircraftSearchFields = ["model", "capacity", "airline.name"];

  const handleSearch = (v: string) => {
    setSearchQuery(v);
  };

  const filteredData = filter(
    aircraft,
    selectedStatus,
    searchQuery,
    aircraftSearchFields
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
      const res = await aircraftApi.getById(id);
      setModalState({
        open: true,
        type: "edit",
        item: { ...res.data, airlineId: res.data.airline?.id },
      });
    } catch {
      toast.error("Failed to load aircraft");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: AircraftSchema) => {
    if (modalState.type === "create") {
      handleCreate(data);
    } else {
      handleUpdate(data);
    }
  };

  return (
    <>
      <div className="p-6 bg-foreground flex flex-col gap-4 flex-1 justify-start items-center">
        <AdminPanelTitle title="Aircraft Panel" icon={Aircraft} />
        <AdminToolbar
          entityType="aircraft"
          onCreate={() => openCreate()}
          onSearch={handleSearch}
          searchPlaceholder="Search aircraft (model, capacity, airline)..."
          filters={
            <StatusFilter
              value={selectedStatus}
              onChange={setSelectedStatus}
              statuses={Object.keys(aircraftStatusColors)}
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
        title={
          modalState.type === "create" ? "Create Aircraft" : "Edit Aircraft"
        }
        statusBar={
          modalState.type === "edit" && modalState.item ? (
            <div className="flex justify-between items-center w-full">
              <div className="inline-flex items-center gap-2">
                <span className="text-sm text-black font-poppins font-semibold">
                  Aircraft Status:
                </span>
                <Badge
                  bgColor={aircraftStatusColors[modalState.item.status].bg}
                  textColor={aircraftStatusColors[modalState.item.status].text}
                  tooltip={aircraftStatusColors[modalState.item.status].tooltip}
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
                {modalState.item.status !== "AVAILABLE" && (
                  <Button
                    variant="modal"
                    size="sm"
                    onClick={() => handleStatusChange("AVAILABLE")}
                    className="text-lg py-2 px-3"
                  >
                    Set AVAILABLE
                  </Button>
                )}

                {modalState.item.status !== "MAINTENANCE" && (
                  <Button
                    variant="modal"
                    size="sm"
                    onClick={() => handleStatusChange("MAINTENANCE")}
                    className="text-lg py-2 px-3"
                  >
                    Set MAINTENANCE
                  </Button>
                )}

                {modalState.item.status !== "INACTIVE" && (
                  <Button
                    variant="modal"
                    size="sm"
                    onClick={() => handleStatusChange("INACTIVE")}
                    className="text-lg py-2 px-3"
                  >
                    Set INACTIVE
                  </Button>
                )}

                {modalState.item.status !== "DECOMMISSIONED" && (
                  <Button
                    variant="modal"
                    size="sm"
                    onClick={() => handleStatusChange("DECOMMISSIONED")}
                    className="text-lg py-2 px-3"
                  >
                    Set DECOMMISSIONED
                  </Button>
                )}
              </div>
            )}
            {modalState.type === "create" ? (
              <Button
                type="submit"
                form="aircraft-form"
                icon={Save}
                iconSize={25}
                variant="submit"
                size="md"
                className="text-lg py-2 px-3 capitalize hover:bg-success"
              >
                Create Aircraft
              </Button>
            ) : (
              <Button
                type="submit"
                form="aircraft-form"
                icon={EditItem}
                iconSize={25}
                variant="submit"
                size="md"
                className="text-lg py-2 px-3 capitalize hover:bg-limited"
              >
                Update Aircraft
              </Button>
            )}
          </div>
        }
      >
        <AircraftForm
          type={modalState.type}
          item={modalState.item}
          onSubmit={onSubmit}
        />
      </AdminModalWindow>
    </>
  );
};
