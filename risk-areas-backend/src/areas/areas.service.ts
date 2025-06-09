import { prisma } from "../lib/prisma";

class AreaService {
   
  async create(areaData: { name: string; }) {
    const newArea = await prisma.area.create({
            data: {
                name: areaData.name,
            }
        });
    return newArea;
  }

  async findAll() {
    const allAreas = await prisma.area.findMany();
    return allAreas;
  }
}

export const areaService = new AreaService();