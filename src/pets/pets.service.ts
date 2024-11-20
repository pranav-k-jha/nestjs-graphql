import { Inject, Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) {}

createPet(createPetInput: CreatePetInput): Promise<Pet>{
    const newPet = this.petsRepository.create(createPetInput); // newPet = new Pet(); new.name = input.name

    return this.petsRepository.save(newPet) // insert
}

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find(); // SELECT * pet
  }

  findOne(id: number): Promise<Pet> {
    return this.petsRepository.findOneOrFail({ where: { id } })
  }
}
