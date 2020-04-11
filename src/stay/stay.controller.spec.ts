import { Test, TestingModule } from '@nestjs/testing';
import { StayController } from './stay.controller';

describe('Stay Controller', () => {
  let controller: StayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StayController],
    }).compile();

    controller = module.get<StayController>(StayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
