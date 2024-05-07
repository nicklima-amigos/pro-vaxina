import { Test, TestingModule } from '@nestjs/testing';
import { VaccinesService } from './vaccines.service';
import { repositoryMocks } from '@src/tests/mocks';
import { vaccineItems } from '@src/tests/stubs/vaccines.stubs';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { Vaccine } from './entities/vaccine.entity';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';

describe('VaccinesService', () => {
  let service: VaccinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VaccinesService, ...repositoryMocks.providers],
    }).compile();

    service = module.get<VaccinesService>(VaccinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all vaccines', async () => {
    repositoryMocks.vaccines.find.mockResolvedValue(vaccineItems);
    const result = await service.findAll();
    expect(result).toBe(vaccineItems);
    expect(repositoryMocks.vaccines.find).toHaveBeenCalled();
  });

  it('should find one vaccine', async () => {
    repositoryMocks.vaccines.findOne.mockResolvedValue(vaccineItems[0]);
    const result = await service.findOne(vaccineItems[0].id);
    expect(result).toBe(vaccineItems[0]);
    expect(repositoryMocks.vaccines.findOne).toHaveBeenCalledWith({
      where: { id: vaccineItems[0].id },
    });
  });

  it('should create a vaccine', async () => {
    const vaccineToCreate: CreateVaccineDto = {
      expirationDate: new Date('2030-01-01'),
      illness: 'Test Ilness',
      manufacturer: 'Brasil',
      model: 'super vac',
    };
    const expectedVaccine: Vaccine = {
      ...vaccineToCreate,
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    repositoryMocks.vaccines.save.mockResolvedValue(expectedVaccine);
    const result = await service.create(vaccineToCreate);
    expect(result).toBe(expectedVaccine);
    expect(repositoryMocks.vaccines.save).toHaveBeenLastCalledWith(
      vaccineToCreate,
    );
  });

  it('should update a vaccine', async () => {
    const vaccineToUpdate: UpdateVaccineDto = {
      manufacturer: 'Venezuela',
    };
    const expectedVaccine: Vaccine = {
      ...vaccineItems[0],
      ...vaccineToUpdate,
    };
    repositoryMocks.vaccines.save.mockResolvedValue(expectedVaccine);
    const result = await service.update(vaccineItems[0].id, vaccineToUpdate);
    expect(result).toBe(expectedVaccine);
    expect(repositoryMocks.vaccines.save).toHaveBeenCalledWith({
      id: vaccineItems[0].id,
      ...vaccineToUpdate,
    });
  });

  it('should delete a vaccine', async () => {
    repositoryMocks.vaccines.delete.mockResolvedValue({ affected: 1 });
    const result = await service.remove(vaccineItems[0].id);
    expect(result.affected).toBe(1);
    expect(repositoryMocks.vaccines.delete).toHaveBeenCalledWith({
      id: vaccineItems[0].id,
    });
  });
});
