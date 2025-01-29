import Image from "next/image";
import { FC } from "react";

interface LogoProps {
  width: string;
  height: string;  
}
const Logo:FC<LogoProps>=({ width, height })=> {
    return(
    <div className="z-50" style={{ width: width, height: height }}>
    <Image
    src="/assets/icons/Logo.png" 
    alt="LetsShop"
    width={50}
    height={20}
    className="w-full h-full object-cover overflow-visible"
    />
</div>
    );
};

export default Logo;