"use client"

import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Prisma } from "@prisma/client";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import PhoneItem from "./phone-item";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { deleteBooking } from "../_actions/delete-booking";
import { toast } from "sonner";
import { useState } from "react";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const isConfirmed = isFuture(booking.date)
  const { service: { barbershop } } = booking
  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      setIsSheetOpen(false)
      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao cancelar reserva. Tente novamente.");
    }
  }

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen)
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0">

            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit" variant={isConfirmed ? "default" : "secondary"}>{isConfirmed ? 'Confirmado' : 'Finalizado'}</Badge>
              <h3 className="font-semibold">{booking.service.name}</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid">
              <p className="text-sm capitalize">{format(booking.date, "MMMM", { locale: ptBR })}</p>
              <p className="text-2xl">{format(booking.date, "dd", { locale: ptBR })}</p>
              <p className="text-sm">{format(booking.date, "HH:mm", { locale: ptBR })}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[90%]">
        <SheetHeader>
          <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="relative h-[180px] w-full flex items-end mt-6">
          <Image src="/map.png" fill className="object-cover" alt="Map" />

          <Card className="z-50 w-full mb-3 mx-5 rounded-xl">
            <CardContent className="px-5 py-3 flex items-center gap-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} className="rounded-xl" />
              </Avatar>
              <div className="">
                <h3 className="font-bold">{barbershop.name}</h3>
                <p className="text-xs">{barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Badge className="w-fit" variant={isConfirmed ? "default" : "secondary"}>{isConfirmed ? 'Confirmado' : 'Finalizado'}</Badge>

          <Card className="mt-3 mb-6">
            <CardContent className="p-3 space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="font-bold">{booking.service.name}</h2>
                <p className="text-sm font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  }).format(Number(booking.service.price))}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <h2 className="text-sm text-gray-400">Data</h2>
                <p className="text-sm">
                  {booking.date && format(booking.date, "d 'de' MMMM", {
                    locale: ptBR
                  })}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <h2 className="text-sm text-gray-400">Horário</h2>
                <p className="text-sm">
                  {format(booking.date, "HH:mm", {
                    locale: ptBR
                  })}
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

          <div className="space-y-3">
            <PhoneItem key={barbershop.phones} phone={barbershop.phones} />
          </div>
        </div>

        <SheetFooter className="mt-6">
          <div className="flex items-center gap-3">
            <SheetClose asChild>
              <Button className="w-full" variant="outline">Voltar</Button>
            </SheetClose>

            {isConfirmed && (
              <Dialog>
                <DialogTrigger>
                  <Button className="w-full" variant="destructive">Cancelar Reserva</Button>
                </DialogTrigger>
                <DialogContent className="w-[90%]">
                  <DialogHeader>
                    <DialogTitle>Você deseja cancelar sua reserva?</DialogTitle>
                    <DialogDescription>
                      Ao cancelar, você perderá sua reserva e não poderá recuperá-la. Essa ação é irreversível.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="flex flex-row gap-3">
                    <DialogClose asChild>
                      <Button className="w-full" variant="secondary">Voltar</Button>
                    </DialogClose>
                    <DialogClose className="w-full">
                      <Button className="w-full" variant="destructive" onClick={handleCancelBooking}>Confirmar</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>


            )}
          </div>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}

export default BookingItem;