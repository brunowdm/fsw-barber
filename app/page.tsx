import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { quickSearchOptions } from "./_constants/search";
import BookingItem from "./_components/booking-item";

const Home = async () => {
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc"
    }
  })

  return (
    <div>
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Bruno!</h2>
        <p>Segunda-feira, 05 de agosto.</p>

        <div className="flex items-center gap-2 mt-6">
          <Input placeholder="Faça sua busca..." />

          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* BUSCA RAPIDA */}
        <div className="flex gap-3 mt-6 overflow-x-scroll [&::webkit--scrollbar:hidden]">
          {quickSearchOptions.map((option) => (
            <Button className="gap-2" variant="secondary" key={option.title}>
              <Image src={option.imageUrl} width={16} height={16} alt={option.title} />
              {option.title}
            </Button>
          ))}
        </div>

        {/* Banner */}
        <div className="relative w-full h-[150px] mt-6">
          <Image alt="Agende nos melhors com FSW Barber" src="/banner-01.png" fill className="object-cover rounded-xl" />
        </div>

        {/* Agendamentos */}
        <BookingItem />

        {/* Recomendados */}
        <h2 className="text-xs font-bold uppercase text-gray-400 mt-6 mb-3">Recomendados</h2>
        <div className="flex gap-4 overflow-auto [&::webkit--scrollbar:hidden]">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/* Populares */}
        <h2 className="text-xs font-bold uppercase text-gray-400 mt-6 mb-3">Populares</h2>
        <div className="flex gap-4 overflow-auto [&::webkit--scrollbar:hidden]">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>



      </div>

      <footer>
        <Card>
          <CardContent className="px-5 py-6">
            <p className="text-sm text-gray-400">© 2023 Copyright <span className="font-bold">FSW Barber</span></p>
          </CardContent>
        </Card>
      </footer>
    </div>
  );
}

export default Home;