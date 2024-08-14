import BarbershopItem from "../_components/barbershop-item";
import Header from "../_components/header";
import Search from "../_components/search";
import { db } from "../_lib/prisma";

interface BarberShopsPageProps {
    searchParams: {
        search?: string
    }
}

const BarberShopsPage = async ({ searchParams }: BarberShopsPageProps) => {
    const barbershops = await db.barbershop.findMany({
        where: {
            name: {
                contains: searchParams?.search,
            },
        },
    })

    return (
        <div>
            <Header />

            <div className="my-6 px-5">
                <Search />
            </div>

            <div className="px-5">
                <h2 className="text-xs font-bold uppercase text-gray-400 mt-6 mb-3">
                    Resultados para "{searchParams.search}"
                </h2>

                <div className="grid grid-cols-2 gap-4">
                    {barbershops.map((barbershop) => (
                        <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BarberShopsPage;