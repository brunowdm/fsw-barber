"use client"

import { Barbershop, BarbershopService, Booking } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import { format, isPast, isToday, set } from "date-fns";
import { createBooking } from "../_actions/create-booking";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { getBookings } from "../_actions/get-bookings";
import { Dialog, DialogContent } from "./ui/dialog";
import SignInDialog from "./sign-in-dialog";

interface ServiceItemProps {
    service: BarbershopService
    barbershop: Pick<Barbershop, 'name'>
}

const TIME_LIST = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
]



const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
    const { data } = useSession();
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
    const [selectedTime, setselectedTime] = useState<string | undefined>(undefined);
    const [dayBookings, setDayBookings] = useState<Booking[]>([]);
    const [bookingSheeetIsOpen, setBookingSheeetIsOpen] = useState(false)
    const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            if (!selectedDay) return;
            const bookings = await getBookings({ date: selectedDay, serviceId: service.id })
            setDayBookings(bookings)
        }

        fetch()
    }, [selectedDay, service.id])

    const handleBookingClick = () => {
        if (data?.user) {
            return setBookingSheeetIsOpen(true)
        }

        return setSignInDialogIsOpen(true)
    }




    interface GetTimeListProps {
        bookings: Booking[]
        selectedDay: Date
    }

    const getTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {
        return TIME_LIST.filter((time) => {
            const hour = Number(time.split(":")[0])
            const minutes = Number(time.split(":")[1])

            const timeIsOnThePast = isPast(set(new Date, { hours: hour, minutes }))
            if (timeIsOnThePast && isToday(selectedDay)) return false;

            const hasBookingOnCurrentTime = bookings.some(
                (booking) =>
                    booking.date.getHours() === hour &&
                    booking.date.getMinutes() === minutes,
            )
            if (hasBookingOnCurrentTime) {
                return false
            }
            return true
        })
    }

    const timeList = useMemo(() => {
        if (!selectedDay) return []

        return getTimeList({
            bookings: dayBookings,
            selectedDay
        })
    }, [dayBookings, selectedDay])

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDay(date)
    }

    const handleTimeSelected = (time: string) => {
        setselectedTime(time)
    }

    const handleCreateBooking = async () => {
        try {
            if (!selectedDay || !selectedTime) return;

            const hour = selectedTime.split(":")[0]
            const minute = selectedTime.split(":")[1]
            const newDate = set(selectedDay, {
                minutes: Number(minute),
                hours: Number(hour)
            })

            await createBooking({
                serviceId: service.id,
                date: newDate
            })
            handleBookingSheeetIsOpen()
            toast.success("Reserva criada com sucesso!")
        } catch (error) {
            console.log(error);
            toast.error("Erro ao criar reserva!")
        }
    }

    const handleBookingSheeetIsOpen = () => {
        setSelectedDay(undefined)
        setselectedTime(undefined)
        setDayBookings([])
        setBookingSheeetIsOpen(false)
    }

    return (
        <>
            <Card>
                <CardContent className="flex items-center gap-3 p-3">

                    <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
                        <Image alt={service.name} src={service.imageUrl} fill className="object-cover rounded-lg" />
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">{service.name}</h3>
                        <p className="text-sm text-gray-400">{service.description}</p>

                        <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-primary">{Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            }).format(Number(service.price))} </p>

                            <Sheet open={bookingSheeetIsOpen} onOpenChange={handleBookingSheeetIsOpen}>

                                <Button variant="secondary" size="sm" onClick={handleBookingClick}>Reservar</Button>

                                <SheetContent className="px-0">
                                    <SheetHeader>
                                        <SheetTitle>Fazer Reserva</SheetTitle>
                                    </SheetHeader>

                                    <div className="py-5 border-b border-solid">
                                        <Calendar
                                            mode="single"
                                            locale={ptBR}
                                            selected={selectedDay}
                                            onSelect={handleDateSelect}
                                            fromDate={new Date()}
                                            styles={{
                                                head_cell: {
                                                    width: "100%",
                                                    textTransform: "capitalize",
                                                },
                                                cell: {
                                                    width: "100%",
                                                },
                                                button: {
                                                    width: "100%",
                                                },
                                                nav_button_previous: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                nav_button_next: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                caption: {
                                                    textTransform: "capitalize",
                                                },
                                            }}
                                        />
                                    </div>

                                    {selectedDay && (
                                        <div className="p-5 flex overflow-x-auto gap-3 border-b border-solid">
                                            {timeList.length > 0 ? (
                                                timeList.map((time) => (
                                                    <Button key={time} variant={selectedTime == time ? "default" : "outline"} className="rounded-full" onClick={() => handleTimeSelected(time)}>{time}</Button>
                                                ))
                                            ) :
                                                <p className="text-xs">Não há horários disponíveis para este dia.</p>
                                            }
                                        </div>
                                    )}

                                    {selectedTime && (
                                        <div className="p-5">
                                            <Card>
                                                <CardContent className="p-3 space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <h2 className="font-bold">{service.name}</h2>
                                                        <p className="text-sm font-bold">
                                                            {Intl.NumberFormat("pt-BR", {
                                                                style: "currency",
                                                                currency: "BRL"
                                                            }).format(Number(service.price))}
                                                        </p>
                                                    </div>

                                                    <div className="flex justify-between items-center">
                                                        <h2 className="text-sm text-gray-400">Data</h2>
                                                        <p className="text-sm">
                                                            {selectedDay && format(selectedDay, "d 'de' MMMM", {
                                                                locale: ptBR
                                                            })}
                                                        </p>
                                                    </div>

                                                    <div className="flex justify-between items-center">
                                                        <h2 className="text-sm text-gray-400">Horário</h2>
                                                        <p className="text-sm">
                                                            {selectedTime}
                                                        </p>
                                                    </div>

                                                    <div className="flex justify-between items-center">
                                                        <h2 className="text-sm text-gray-400">Barbearia</h2>
                                                        <p className="text-sm">
                                                            {barbershop.name}
                                                        </p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    )}

                                    <SheetFooter className="px-5 mt-5">
                                        <Button onClick={handleCreateBooking} disabled={!selectedDay || !selectedTime}>Confirmar</Button>
                                    </SheetFooter>

                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={signInDialogIsOpen} onOpenChange={(open) => setSignInDialogIsOpen(open)}>
                <DialogContent className="w-[90%]">
                    <SignInDialog />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ServiceItem;