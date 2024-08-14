import PhoneItem from "@/app/_components/phone-item";
import ServiceItem from "@/app/_components/service-item";
import SideBar from "@/app/_components/sidebar";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, SmartphoneIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BerbershopPageProps {
    params: {
        id: string
    }
}

const BerbershopPage = async ({ params }: BerbershopPageProps) => {
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id
        },
        include: {
            services: true
        }
    })

    if (!barbershop) {
        return notFound();
    }



    return (
        <div>
            <div className="relative w-full h-[250px]">
                <Image src={barbershop?.imageUrl} fill className="object-cover" alt={barbershop?.name} />

                <Button size="icon" variant="secondary" className="absolute left-4 top-4" asChild>
                    <Link href="/">
                        <ChevronLeftIcon />
                    </Link>
                </Button>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="secondary" className="absolute right-4 top-4 ">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>

                    <SideBar />
                </Sheet>
            </div>

            <div className="p-5 border-b border-solid">
                <h1 className="font-bold text-xl mb-3">{barbershop?.name}</h1>

                <div className="flex items-center mb-2 gap-2">
                    <MapPinIcon className="text-primary" size={18} />
                    <p className="text-sm">{barbershop?.address}</p>
                </div>

                <div className="flex items-center gap-2">
                    <StarIcon className="text-primary fill-primary" size={18} />
                    <p className="text-sm">5,0 (889 avaliações)</p>
                </div>
            </div>

            <div className="p-5 border-b border-solid space-y-3">
                <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
                <p className="text-sm text-justify">{barbershop?.description}</p>
            </div>

            <div className="p-5 space-y-3 border-b border-solid">
                <h2 className="text-xs font-bold uppercase text-gray-400">Serviços</h2>
                <div className="space-y-3">
                    {barbershop.services.map((service) => (
                        <ServiceItem service={service} key={service.id} />
                    ))}
                </div>
            </div>

            <PhoneItem phone={barbershop.phones} />
        </div>
    );
}

export default BerbershopPage;