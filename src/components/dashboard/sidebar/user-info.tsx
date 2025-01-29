import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "@clerk/nextjs/server";
import React from "react";

export default function userInfo({user}:{user:User | null}) {
    return (
        <div>
            <div>
                <Button className="w-full mt-5 mb-4 flex items-center justify-between py-10" variant="ghost">
                 <div className="flex items-center text-left gap-2 ">
                    <Avatar className="w-16 h-16">
                        <AvatarImage src={user?.imageUrl} 
                        alt={`${user?.firstName} ${user?.lastName}`} />
                        <AvatarFallback className="bg-primary text-white">
                          {user?.firstName} {user?.lastName}  
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-y-1">
                        {user?.firstName} {user?.lastName}
                        <span className="text-muted-foreground">
                            {user?.emailAddresses[0].emailAddress}
                        </span>
                        <span className="w-fit">
                            <Badge variant="secondary" className="capitalize" >
                              {user?.privateMetadata?.role
                             ?user?.privateMetadata?.role:""}
                            </Badge>
                        </span>
                    </div>
                 </div>

                </Button>
            </div>
        </div>
    );
};