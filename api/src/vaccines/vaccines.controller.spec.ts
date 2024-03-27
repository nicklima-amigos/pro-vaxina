import { VaccinesController } from './vaccines.controller';

const vaccineServiceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('VaccinesController', () => {
  let controller: VaccinesController;

  beforeAll(() => {
    controller = new VaccinesController(vaccineServiceMock as any);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find one vaccine.', async () => {
    // arrange
    const expected = 'mockedReturnValue';
    vaccineServiceMock.findOne.mockReturnValue(expected);

    //act
    const result = controller.findOne('10');

    //assert
    expect(result).toBe(expected);
  });
});
