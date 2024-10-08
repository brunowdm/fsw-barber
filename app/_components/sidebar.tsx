"use client"

import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { signIn, signOut, useSession } from "next-auth/react";
import SignInDialog from "./sign-in-dialog";

const SideBar = () => {

    const handleLoginWithGoogleClick = () => signIn("google")
    const handleLogoutClick = () => signOut()
    const { data } = useSession()

    return (
        <SheetContent className="overflow-y-auto">
            <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="py-5 border-b border-solid flex items-center gap-2 justify-between">
                {data?.user ? (
                    <>
                        <div className="flex items-center gap-2">
                            <Avatar>
                                <AvatarImage src={data?.user?.image ?? ''} />
                            </Avatar>

                            <div>
                                <p className="font-bold">{data.user.name}</p>
                                <p className="text-xs">{data.user.email}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="font-bold">Olá, faça seu login!</h2>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="icon">
                                    <LogInIcon />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="w-[90%]">
                                <SignInDialog />
                            </DialogContent>
                        </Dialog>
                    </>
                )}
            </div>

            <div className="py-5 flex flex-col gap-2 border-b border-solid">
                <SheetClose asChild>
                    <Button className="gap-2 justify-start" asChild variant="ghost">
                        <Link href="/">
                            <HomeIcon size={18} />
                            Início
                        </Link>
                    </Button>
                </SheetClose>
                <Button className="gap-2 justify-start" variant="ghost" asChild>
                    <Link href="/bookings">
                        <CalendarIcon size={18} />
                        Agendamentos
                    </Link>
                </Button>
            </div>

            <div className="py-5 flex flex-col gap-2 border-b border-solid">
                {quickSearchOptions.map((option) => (
                    <SheetClose asChild key={option.title}>
                        <Button className="gap-2 justify-start" variant="ghost" asChild>
                            <Link href={`/barbershops?service=${option.title}`}>
                                <Image alt={option.title} src={option.imageUrl} width={18} height={18} />
                                {option.title}
                            </Link>
                        </Button>
                    </SheetClose>
                ))}
            </div>

            {data?.user && (
                <div className="py-5 flex flex-col gap-2">
                    <Button variant="ghost" className="justify-start gap-2" onClick={handleLogoutClick}>
                        <LogOutIcon size={18} />
                        Sair da conta
                    </Button>
                </div>
            )}
        </SheetContent>
    );
}

export default SideBar;