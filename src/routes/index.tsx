import { Title } from "@solidjs/meta";
import pb from "~/libs/pb";


const login = async () => {
  console.log(pb.authStore)
};

export default function Home() {
  return (
    <main>
      <Title>Hello World</Title>
    </main>
  );
}
