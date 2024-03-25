import { VaccinesController } from './vaccines.controller';

describe('VaccinesController', () => {
  let controller: VaccinesController;
  const vaccineServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
  beforeAll(() => {
    controller = new VaccinesController(vaccineServiceMock);
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
