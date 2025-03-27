import bcrypt from "bcryptjs";
import { prisma } from "@/../prisma/client";

export const seedDB = async () => {
  const sets = await prisma.carSet.findMany();

  try {
    await createAdminAccount();

    if (sets.length) return;

    await prisma.carSet.create({
      data: {
        url: "nissan-vs-toyota-vs-volvo-vs-mercedes-vs-vw",
        cars: {
          create: [
            {
              brand: "Nissan",
              model: "X-Trail",
              imgUrl: "/images/nissan.jpeg",
              questions: {
                create: [
                  {
                    text: "Przestronność wnętrza (ilość miejsca dla pasażerów)",
                  },
                  {
                    text: "Układ przestrzeni bagażowej",
                  },
                  {
                    text: "Komfort siedzeń",
                  },
                  {
                    text: "Jakość wykończenia wnętrza",
                  },
                  {
                    text: "Działanie systemów asystujących",
                  },
                  {
                    text: "Średnie zużycie paliwa",
                  },
                  {
                    text: "Intuicyjność działania systemu Infotainment",
                  },
                  {
                    text: "Elastyczność oraz dynamika silnika",
                  },
                ],
              },
            },
            {
              brand: "Toyota",
              model: "RAV4",
              imgUrl: "/../images/toyota.jpg",
              questions: {
                create: [
                  {
                    text: "Przestronność wnętrza (ilość miejsca dla pasażerów)",
                  },
                  {
                    text: "Układ przestrzeni bagażowej",
                  },
                  {
                    text: "Komfort siedzeń",
                  },
                  {
                    text: "Jakość wykończenia wnętrza",
                  },
                  {
                    text: "Działanie systemów asystujących",
                  },
                  {
                    text: "Średnie zużycie paliwa",
                  },
                  {
                    text: "Intuicyjność działania systemu Infotainment",
                  },
                  {
                    text: "Elastyczność oraz dynamika silnika",
                  },
                ],
              },
            },
            {
              brand: "Volvo",
              model: "XC60",
              imgUrl: "/../images/volvo.jpg",
              questions: {
                create: [
                  {
                    text: "Przestronność wnętrza (ilość miejsca dla pasażerów)",
                  },
                  {
                    text: "Układ przestrzeni bagażowej",
                  },
                  {
                    text: "Komfort siedzeń",
                  },
                  {
                    text: "Jakość wykończenia wnętrza",
                  },
                  {
                    text: "Działanie systemów asystujących",
                  },
                  {
                    text: "Średnie zużycie paliwa",
                  },
                  {
                    text: "Intuicyjność działania systemu Infotainment",
                  },
                  {
                    text: "Elastyczność oraz dynamika silnika",
                  },
                ],
              },
            },
            {
              brand: "Mercedes",
              model: "GLB",
              imgUrl: "/../images/glb.webp",
              questions: {
                create: [
                  {
                    text: "Przestronność wnętrza (ilość miejsca dla pasażerów)",
                  },
                  {
                    text: "Układ przestrzeni bagażowej",
                  },
                  {
                    text: "Komfort siedzeń",
                  },
                  {
                    text: "Jakość wykończenia wnętrza",
                  },
                  {
                    text: "Działanie systemów asystujących",
                  },
                  {
                    text: "Średnie zużycie paliwa",
                  },
                  {
                    text: "Intuicyjność działania systemu Infotainment",
                  },
                  {
                    text: "Elastyczność oraz dynamika silnika",
                  },
                ],
              },
            },
            {
              brand: "Volkswagen",
              model: "Tayron",
              imgUrl: "/../images/tayron.webp",
              questions: {
                create: [
                  {
                    text: "Przestronność wnętrza (ilość miejsca dla pasażerów)",
                  },
                  {
                    text: "Układ przestrzeni bagażowej",
                  },
                  {
                    text: "Komfort siedzeń",
                  },
                  {
                    text: "Jakość wykończenia wnętrza",
                  },
                  {
                    text: "Działanie systemów asystujących",
                  },
                  {
                    text: "Średnie zużycie paliwa",
                  },
                  {
                    text: "Intuicyjność działania systemu Infotainment",
                  },
                  {
                    text: "Elastyczność oraz dynamika silnika",
                  },
                ],
              },
            },
          ],
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createAdminAccount = async () => {
  try {
    const users = await prisma.user.findMany({});
    const dbIsNotEmpty = users.length !== 0;
    if (dbIsNotEmpty) return;

    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);

    await prisma.user.create({
      data: { email: "admin@nm.com.pl", password, createdAt: new Date() },
    });
  } catch (error) {
    console.log(error);
  }
};
