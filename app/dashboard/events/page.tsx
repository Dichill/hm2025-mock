"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    getAllEvents,
    getMyRegisteredEvents,
    registerForEvent,
    unregisterFromEvent,
} from "@/core/user/api/event";
import { EventResponseDto } from "@/core/user/types/event.dto";
import { Calendar, MapPin, Clock, Tag } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import Image from "next/image";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function EventsPage() {
    const [isClient, setIsClient] = useState(false);
    const [allEvents, setAllEvents] = useState<EventResponseDto[]>([]);
    const [registeredEvents, setRegisteredEvents] = useState<
        EventResponseDto[]
    >([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [registrationStatus, setRegistrationStatus] = useState<
        Record<string, boolean>
    >({});
    const [registrationLoading, setRegistrationLoading] = useState<
        Record<string, boolean>
    >({});

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    const buttonVariants = {
        hover: {
            scale: 1.03,
            boxShadow: "0 8px 20px rgba(var(--mesa-green), 0.2)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
        tap: { scale: 0.97 },
    };

    const unregisterButtonVariants = {
        hover: {
            scale: 1.03,
            boxShadow: "0 8px 20px rgba(var(--mesa-warm-red), 0.2)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
        tap: { scale: 0.97 },
    };

    useEffect(() => {
        setIsClient(true);

        if (isClient) {
            fetchEvents();
        }
    }, [isClient]);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const [allEventsData, registeredEventsData] = await Promise.all([
                getAllEvents(),
                getMyRegisteredEvents(),
            ]);

            setAllEvents(allEventsData || []);
            setRegisteredEvents(registeredEventsData || []);

            // Initialize registration status for all events
            const statusMap: Record<string, boolean> = {};
            if (allEventsData && registeredEventsData) {
                allEventsData.forEach((event) => {
                    statusMap[event.id] = registeredEventsData.some(
                        (re) => re.id === event.id
                    );
                });
            }
            setRegistrationStatus(statusMap);
        } catch (error) {
            console.error("Error fetching events:", error);
            toast.error("Failed to load events. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegistration = async (eventId: string) => {
        try {
            setRegistrationLoading((prev) => ({ ...prev, [eventId]: true }));

            if (registrationStatus[eventId]) {
                await unregisterFromEvent({ eventId });
                setRegistrationStatus((prev) => ({
                    ...prev,
                    [eventId]: false,
                }));
                setRegisteredEvents((prev) =>
                    prev.filter((event) => event.id !== eventId)
                );
                toast.success(
                    "You have successfully unregistered from this event."
                );
            } else {
                await registerForEvent({ eventId });
                setRegistrationStatus((prev) => ({ ...prev, [eventId]: true }));
                const eventToAdd = allEvents.find(
                    (event) => event.id === eventId
                );
                if (eventToAdd) {
                    setRegisteredEvents((prev) => [...prev, eventToAdd]);
                }
                toast.success(
                    "You have successfully registered for this event."
                );
            }
        } catch (error) {
            console.error("Error updating registration:", error);
            toast.error(
                "Failed to update registration. Please try again later."
            );
        } finally {
            setRegistrationLoading((prev) => ({ ...prev, [eventId]: false }));
        }
    };

    const formatDate = (date: Date) => {
        return format(new Date(date), "MMM dd, yyyy");
    };

    const formatTime = (date: Date) => {
        return format(new Date(date), "h:mm a");
    };

    const EventCard = ({ event }: { event: EventResponseDto }) => {
        const [imgError, setImgError] = useState(false);
        const isRegistered = registrationStatus[event.id];

        return (
            <motion.div variants={cardVariants} className="h-full">
                <Card className="overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full p-0 bg-white">
                    {event.thumbnail_url && !imgError ? (
                        <div className="relative h-64 w-full">
                            <Image
                                src={event.thumbnail_url}
                                alt={event.title}
                                fill
                                className="object-cover w-full h-full"
                                onError={() => setImgError(true)}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority
                            />
                        </div>
                    ) : (
                        <div className="relative h-64 w-full bg-[rgb(var(--mesa-grey))/0.05] flex items-center justify-center">
                            <Calendar className="h-16 w-16 text-[rgb(var(--mesa-orange))]" />
                        </div>
                    )}
                    <CardContent className="p-6 flex flex-col flex-grow">
                        <div className="flex flex-col flex-grow">
                            <h3 className="text-xl font-medium mb-3 text-gray-800">
                                {event.title}
                            </h3>
                            <div className="flex items-center text-gray-600 mb-2">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                    {formatDate(event.start_time)}
                                </span>
                            </div>
                            <div className="flex items-center text-gray-600 mb-2">
                                <Clock className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                    {formatTime(event.start_time)} -{" "}
                                    {formatTime(event.end_time)}
                                </span>
                            </div>
                            <div className="flex items-center text-gray-600 mb-2">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                    {event.location}
                                </span>
                            </div>
                            <div className="flex items-center mb-4">
                                <Tag className="h-4 w-4 mr-2 text-gray-600" />
                                <span className="text-sm px-2 py-0.5 rounded-full bg-[rgb(var(--mesa-yellow-116))]/10 text-[rgb(var(--mesa-yellow-116))]">
                                    {event.event_type}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-5 line-clamp-3 flex-grow">
                                {event.description}
                            </p>
                            <motion.button
                                whileHover={isRegistered ? "hover" : "hover"}
                                whileTap="tap"
                                variants={
                                    isRegistered
                                        ? unregisterButtonVariants
                                        : buttonVariants
                                }
                                className={`cursor-pointer w-full py-2 rounded-md font-medium text-center ${
                                    isRegistered
                                        ? "bg-[rgb(var(--mesa-warm-red))]/10 text-[rgb(var(--mesa-warm-red))]"
                                        : "bg-[rgb(var(--mesa-green))]/10 text-[rgb(var(--mesa-green))]"
                                }`}
                                disabled={registrationLoading[event.id]}
                                onClick={() => handleRegistration(event.id)}
                            >
                                {registrationLoading[event.id]
                                    ? "Processing..."
                                    : isRegistered
                                    ? "Unregister"
                                    : "Register"}
                            </motion.button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full py-20">
                <div className="w-16 h-16 border-4 border-t-[rgb(var(--mesa-orange))] border-r-[rgb(var(--mesa-orange))] border-b-[rgb(var(--mesa-orange))] border-l-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="container py-8">
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold mb-8 text-gray-800"
            >
                Events
            </motion.h1>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
            >
                <Tabs defaultValue="all" className="mb-8">
                    <TabsList className="mb-6 border border-gray-200 p-1 rounded-lg bg-transparent">
                        <TabsTrigger
                            value="all"
                            className="cursor-pointer data-[state=active]:bg-[rgb(var(--mesa-orange))]/10 data-[state=active]:text-[rgb(var(--mesa-orange))]"
                        >
                            All Events
                        </TabsTrigger>
                        <TabsTrigger
                            value="registered"
                            className="cursor-pointer data-[state=active]:bg-[rgb(var(--mesa-orange))]/10 data-[state=active]:text-[rgb(var(--mesa-orange))]"
                        >
                            Registered Events
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {allEvents && allEvents.length > 0 ? (
                                allEvents.map((event) => (
                                    <EventCard key={event.id} event={event} />
                                ))
                            ) : (
                                <motion.div
                                    variants={cardVariants}
                                    className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12"
                                >
                                    <p className="text-gray-500">
                                        No events available at this time.
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="registered">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {registeredEvents && registeredEvents.length > 0 ? (
                                registeredEvents.map((event) => (
                                    <EventCard key={event.id} event={event} />
                                ))
                            ) : (
                                <motion.div
                                    variants={cardVariants}
                                    className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12"
                                >
                                    <p className="text-gray-500">
                                        You haven&apos;t registered for any
                                        events yet.
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </motion.div>
        </div>
    );
}
