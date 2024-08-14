import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const Header = () => {
    return (
        <Card>
            <CardContent className="justify-between items-center flex flex-row p-5">
                <Image src="/logo.png" height={18} width={120} alt="FSW Barver" />


                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle className="text-left">Menu</SheetTitle>
                        </SheetHeader>

                        <div className="py-5 border-b border-solid flex items-center gap-2">
                            <Avatar>
                                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                            </Avatar>

                            <div>
                                <p className="font-bold">Bruno Wan Der Maas</p>
                                <p className="text-xs">brunowam@gmail.com</p>
                            </div>
                        </div>

                        <div className="py-5 flex flex-col gap-2 border-b border-solid">
                            <SheetClose asChild>
                                <Button className="gap-2 justify-start" asChild>
                                    <Link href="/">
                                        <HomeIcon size={18} />
                                        Início
                                    </Link>
                                </Button>
                            </SheetClose>
                            <Button className="gap-2 justify-start" variant="ghost">
                                <CalendarIcon size={18} />
                                Agendamentos
                            </Button>
                        </div>

                        <div className="py-5 flex flex-col gap-2 border-b border-solid">
                            {quickSearchOptions.map((option) => (
                                <Button className="gap-2 justify-start" variant="ghost" key={option.title}>
                                    <Image alt={option.title} src={option.imageUrl} width={18} height={18} />
                                    {option.title}
                                </Button>
                            ))}
                        </div>

                        <div className="py-5 flex flex-col gap-2">
                            <Button variant="ghost" className="justify-start gap-2">
                                <LogOutIcon size={18} />
                                Sair da conta
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </CardContent>
        </Card>
    );
}

export default Header;