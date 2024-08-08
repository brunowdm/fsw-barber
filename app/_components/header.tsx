import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
    return ( 
        <Card>
            <CardContent className="justify-between items-center flex flex-row p-5">
                <Image src="/logo.png" height={18} width={120} alt="FSW Barver" />
                <Button size="icon" variant="outline">
                     <MenuIcon />
                </Button>
            </CardContent>
        </Card>
    );
}
 
export default Header;