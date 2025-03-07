import { User } from "@/types/json-placeholder-api";
import { NWLink } from "./Nativewind";
import { Card } from "./ui/card";
import { View } from "react-native";
import { Badge } from "./ui/badge";
import { Large, P } from "./ui/typography";

interface AuthorInfoProps {
  author: User;
}

export const AuthorInfo = ({ author }: AuthorInfoProps) => {
  return (
    <NWLink
      href={`/users/${author.id}`}
      className="flex-1 w-full active:scale-95 transition-all duration-100"
    >
      <Card className="bg-indigo-500 border-0 w-full">
        <View className="flex flex-row items-center gap-4  align-center p-2">
          <View className="h-12 w-12 rounded-full bg-primary-foreground/20 items-center justify-center">
            <Large className="text-lg font-bold text-primary-foreground">
              {author?.name?.charAt(0) || "U"}
            </Large>
          </View>
          <View>
            <Badge variant="default" className="bg-yellow-400 self-start">
              <P className="text-primary text-sm font-bold">
                @{author.username}
              </P>
            </Badge>
            <P className="text-xl font-bold text-primary-foreground">
              {author?.name || "Unknown User"}
            </P>
          </View>
        </View>
      </Card>
    </NWLink>
  );
};
