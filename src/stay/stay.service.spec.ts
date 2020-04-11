import { Test, TestingModule } from '@nestjs/testing';
import { StayService } from './stay.service';

describe('StayService', () => {
  let service: StayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StayService],
    }).compile();

    service = module.get<StayService>(StayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
