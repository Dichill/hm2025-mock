"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    getAllEventsWithRegistrationCounts,
    createEvent,
    updateEvent,
    deleteEvent,
} from "@/core/user/api/admin";
import { CreateEventDto, UpdateEventDto } from "@/core/user/types/admin.dto";
import { EventResponseDto } from "@/core/user/types/event.dto";
import {
    PlusCircle,
    Edit,
    Trash2,
    Calendar,
    Users,
    MapPin,
    Clock,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

interface EventWithRegistrationCount extends EventResponseDto {
    registration_count: number;
}

export default function AdminEventsPage() {
    const [events, setEvents] = useState<EventWithRegistrationCount[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [formMode, setFormMode] = useState<"create" | "edit">("create");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] =
        useState<EventWithRegistrationCount | null>(null);
    const [formData, setFormData] = useState<CreateEventDto | UpdateEventDto>({
        title: "",
        description: "",
        start_time: new Date(),
        end_time: new Date(),
        location: "",
        event_type: "",
        thumbnail_url: "",
    });
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [eventToDelete, setEventToDelete] = useState<string | null>(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const eventsData = await getAllEventsWithRegistrationCounts();
            setEvents(eventsData);
        } catch (error) {
            console.error("Error fetching events:", error);
            toast.error("Failed to load events. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenForm = (
        mode: "create" | "edit",
        event?: EventWithRegistrationCount
    ) => {
        if (mode === "edit" && event) {
            setSelectedEvent(event);
            setFormData({
                title: event.title,
                description: event.description,
                start_time: new Date(event.start_time),
                end_time: new Date(event.end_time),
                location: event.location,
                event_type: event.event_type,
                thumbnail_url: event.thumbnail_url || "",
            });
        } else {
            setSelectedEvent(null);
            setFormData({
                title: "",
                description: "",
                start_time: new Date(),
                end_time: new Date(),
                location: "",
                event_type: "",
                thumbnail_url: "",
            });
        }
        setFormMode(mode);
        setFormOpen(true);
    };

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateTimeChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: new Date(value),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            if (formMode === "create") {
                await createEvent(formData as CreateEventDto);
                toast.success("Event created successfully!");
            } else if (formMode === "edit" && selectedEvent) {
                await updateEvent(selectedEvent.id, formData as UpdateEventDto);
                toast.success("Event updated successfully!");
            }
            setFormOpen(false);
            fetchEvents();
        } catch (error) {
            console.error(
                `Error ${
                    formMode === "create" ? "creating" : "updating"
                } event:`,
                error
            );
            toast.error(
                `Failed to ${
                    formMode === "create" ? "create" : "update"
                } event. Please try again.`
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteEvent(id);
            toast.success("Event deleted successfully!");
            fetchEvents();
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error("Error deleting event:", error);
            toast.error("Failed to delete event. Please try again.");
        }
    };

    const confirmDelete = (id: string) => {
        setEventToDelete(id);
        setDeleteDialogOpen(true);
    };

    const formatDateTime = (date: Date) => {
        return format(new Date(date), "yyyy-MM-dd'T'HH:mm");
    };

    const formatDisplayDate = (date: Date) => {
        return format(new Date(date), "MMM dd, yyyy");
    };

    const formatDisplayTime = (date: Date) => {
        return format(new Date(date), "h:mm a");
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut",
            },
        }),
    };

    return (
        <div className="py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[rgb(var(--mesa-grey))]">
                    Event Management
                </h1>
                <Button
                    onClick={() => handleOpenForm("create")}
                    className="bg-[rgb(var(--mesa-green))] hover:bg-[rgb(var(--mesa-green)/0.9)] text-white cursor-pointer"
                >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Event
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="w-12 h-12 border-4 border-t-[rgb(var(--mesa-orange))] border-r-[rgb(var(--mesa-orange))] border-b-[rgb(var(--mesa-orange))] border-l-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {events.length > 0 ? (
                        events.map((event, index) => (
                            <motion.div
                                key={event.id}
                                custom={index}
                                initial="hidden"
                                animate="visible"
                                variants={cardVariants}
                            >
                                <Card className="overflow-hidden">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row justify-between">
                                            <div className="flex-1">
                                                <h2 className="text-xl font-semibold mb-2 text-[rgb(var(--mesa-grey))]">
                                                    {event.title}
                                                </h2>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                                                    <div className="flex items-center text-[rgb(var(--mesa-grey)/0.7)]">
                                                        <Calendar className="h-4 w-4 mr-2" />
                                                        <span className="text-sm">
                                                            {formatDisplayDate(
                                                                event.start_time
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center text-[rgb(var(--mesa-grey)/0.7)]">
                                                        <Clock className="h-4 w-4 mr-2" />
                                                        <span className="text-sm">
                                                            {formatDisplayTime(
                                                                event.start_time
                                                            )}{" "}
                                                            -{" "}
                                                            {formatDisplayTime(
                                                                event.end_time
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center text-[rgb(var(--mesa-grey)/0.7)]">
                                                        <MapPin className="h-4 w-4 mr-2" />
                                                        <span className="text-sm">
                                                            {event.location}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center text-[rgb(var(--mesa-grey)/0.7)]">
                                                        <Users className="h-4 w-4 mr-2" />
                                                        <span className="text-sm">
                                                            {
                                                                event.registration_count
                                                            }{" "}
                                                            {event.registration_count ===
                                                            1
                                                                ? "registration"
                                                                : "registrations"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-[rgb(var(--mesa-grey)/0.8)] mb-4">
                                                    {event.description.length >
                                                    200
                                                        ? `${event.description.substring(
                                                              0,
                                                              200
                                                          )}...`
                                                        : event.description}
                                                </p>
                                                <div className="inline-block px-3 py-1 rounded-full bg-[rgb(var(--mesa-yellow-107)/0.2)] text-[rgb(var(--mesa-grey))] text-sm">
                                                    {event.event_type}
                                                </div>
                                                {event.thumbnail_url && (
                                                    <div className="mt-4">
                                                        <p className="text-sm font-medium text-[rgb(var(--mesa-grey)/0.7)] mb-2">
                                                            Thumbnail:
                                                        </p>
                                                        <div className="relative w-full max-w-[300px] h-[150px] rounded-md overflow-hidden border border-gray-200">
                                                            <Image
                                                                src={
                                                                    event.thumbnail_url
                                                                }
                                                                alt={`Thumbnail for ${event.title}`}
                                                                className="w-full h-full object-cover"
                                                                width={300}
                                                                height={150}
                                                                onError={(
                                                                    e
                                                                ) => {
                                                                    const target =
                                                                        e.target as HTMLImageElement;
                                                                    target.src =
                                                                        "https://placehold.co/300x150/eee/999?text=No+Image";
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0 md:ml-4">
                                                <Button
                                                    variant="outline"
                                                    className="border-[rgb(var(--mesa-yellow-107))] text-[rgb(var(--mesa-yellow-107))] hover:bg-[rgb(var(--mesa-yellow-107)/0.1)] cursor-pointer"
                                                    onClick={() =>
                                                        handleOpenForm(
                                                            "edit",
                                                            event
                                                        )
                                                    }
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="border-[rgb(var(--mesa-warm-red))] text-[rgb(var(--mesa-warm-red))] hover:bg-[rgb(var(--mesa-warm-red)/0.1)] cursor-pointer"
                                                    onClick={() =>
                                                        confirmDelete(event.id)
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                            <Calendar className="h-12 w-12 mx-auto text-[rgb(var(--mesa-warm-red)/0.5)] mb-4" />
                            <h3 className="text-lg font-medium text-[rgb(var(--mesa-grey))]">
                                No Events Found
                            </h3>
                            <p className="text-[rgb(var(--mesa-grey)/0.7)] mt-2">
                                Create your first event to get started.
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Create/Edit Event Form Dialog */}
            <Dialog open={formOpen} onOpenChange={setFormOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>
                            {formMode === "create"
                                ? "Create New Event"
                                : "Edit Event"}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-1 gap-2">
                                <label
                                    htmlFor="title"
                                    className="text-sm font-medium"
                                >
                                    Title
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange)/0.5)]"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                                <label
                                    htmlFor="description"
                                    className="text-sm font-medium"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows={4}
                                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange)/0.5)]"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <label
                                        htmlFor="start_time"
                                        className="text-sm font-medium"
                                    >
                                        Start Time
                                    </label>
                                    <input
                                        id="start_time"
                                        name="start_time"
                                        type="datetime-local"
                                        value={formatDateTime(
                                            formData.start_time as Date
                                        )}
                                        onChange={(e) =>
                                            handleDateTimeChange(
                                                "start_time",
                                                e.target.value
                                            )
                                        }
                                        required
                                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange)/0.5)]"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label
                                        htmlFor="end_time"
                                        className="text-sm font-medium"
                                    >
                                        End Time
                                    </label>
                                    <input
                                        id="end_time"
                                        name="end_time"
                                        type="datetime-local"
                                        value={formatDateTime(
                                            formData.end_time as Date
                                        )}
                                        onChange={(e) =>
                                            handleDateTimeChange(
                                                "end_time",
                                                e.target.value
                                            )
                                        }
                                        required
                                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange)/0.5)]"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                                <label
                                    htmlFor="location"
                                    className="text-sm font-medium"
                                >
                                    Location
                                </label>
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange)/0.5)]"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                                <label
                                    htmlFor="event_type"
                                    className="text-sm font-medium"
                                >
                                    Event Type
                                </label>
                                <input
                                    id="event_type"
                                    name="event_type"
                                    type="text"
                                    value={formData.event_type}
                                    onChange={handleInputChange}
                                    required
                                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange)/0.5)]"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                                <label
                                    htmlFor="thumbnail_url"
                                    className="text-sm font-medium"
                                >
                                    Thumbnail URL (Optional)
                                </label>
                                <input
                                    id="thumbnail_url"
                                    name="thumbnail_url"
                                    type="url"
                                    value={formData.thumbnail_url || ""}
                                    onChange={handleInputChange}
                                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange)/0.5)]"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setFormOpen(false)}
                                className="hover:bg-gray-100 cursor-pointer"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-[rgb(var(--mesa-green))] hover:bg-[rgb(var(--mesa-green)/0.9)] text-white cursor-pointer"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        {formMode === "create"
                                            ? "Creating..."
                                            : "Updating..."}
                                    </>
                                ) : formMode === "create" ? (
                                    "Create"
                                ) : (
                                    "Update"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-[rgb(var(--mesa-grey))]">
                            Are you sure you want to delete this event? This
                            action cannot be undone.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                            className="hover:bg-gray-100 cursor-pointer"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            className="bg-[rgb(var(--mesa-warm-red))] hover:bg-[rgb(var(--mesa-warm-red)/0.9)] text-white cursor-pointer"
                            onClick={() => {
                                if (eventToDelete) {
                                    setIsSubmitting(true);
                                    handleDelete(eventToDelete);
                                }
                            }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Deleting...
                                </>
                            ) : (
                                "Delete"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
