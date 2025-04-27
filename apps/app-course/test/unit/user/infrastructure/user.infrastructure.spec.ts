import { plainToInstance } from "class-transformer";
import { IsNull } from "typeorm";
import { DatabaseBootstrap } from '../../../../src/bootstrap/database.bootstrap';
import { DatabaseException } from '../../../../src/core/exceptions/database.exception';
import { ResponseByPage } from '../../../../src/core/responses/response-by-page';
import { RoleEntity } from '../../../../src/modules/role/infrastructure/entities/role.entity';
import { Sex, User } from '../../../../src/modules/user/domain/user';
import { UserDto } from "../../../../src/modules/user/infrastructure/dtos/user.dto";
import { UserEntity } from "../../../../src/modules/user/infrastructure/entities";
import { UserInfrastructure } from '../../../../src/modules/user/infrastructure/user.infrastructure';

jest.mock('../../../../src/bootstrap/database.bootstrap');
jest.mock("../../../../src/modules/user/infrastructure/dtos/user.dto");
jest.mock("class-transformer");

describe('UserInfrastructure', () => {
    let userInfrastructure: UserInfrastructure;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    let mockRepository: any;
    let mockUser: User;
    let mockUserEntity: UserEntity;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    let mockRole: any;

    beforeEach(() => {
        mockRepository = {
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            findAndCount: jest.fn()
        };

        mockRole = {
            roleId: 1,
            name: 'ADMIN'
        };

        mockUser = new User({
            userId: 1,
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            age: 30,
            sex: Sex.Male,
            refreshToken: 'refresh-token',
            roles: [mockRole]
        });

        mockUserEntity = new UserEntity();
        mockUserEntity.userId = 1;
        mockUserEntity.name = 'Test User';
        mockUserEntity.email = 'test@example.com';
        mockUserEntity.password = 'password123';
        mockUserEntity.age = 30;
        mockUserEntity.sex = 'MALE';
        mockUserEntity.refreshToken = 'refresh-token';
        mockUserEntity.roles = [mockRole] as RoleEntity[];

        // Asignar directamente al mock de DatabaseBootstrap
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        (DatabaseBootstrap as any).datasource = {
            getRepository: jest.fn().mockReturnValue(mockRepository)
        };

        (UserDto.fromDomainToData as jest.Mock).mockReturnValue(mockUserEntity);
        (UserDto.fromDataToDomain as jest.Mock).mockReturnValue(mockUser);
        (plainToInstance as jest.Mock).mockReturnValue(mockRole);
        
        userInfrastructure = new UserInfrastructure();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('save', () => {
        it('should save a user successfully', async () => {
            mockRepository.save.mockResolvedValue(mockUserEntity);

            const result = await userInfrastructure.save(mockUser);

            expect(DatabaseBootstrap.datasource.getRepository).toHaveBeenCalledWith(UserEntity);
            expect(UserDto.fromDomainToData).toHaveBeenCalledWith(mockUser);
            expect(mockRepository.save).toHaveBeenCalledWith(mockUserEntity);
            expect(plainToInstance).toHaveBeenCalledWith(RoleEntity, mockRole);
            expect(UserDto.fromDataToDomain).toHaveBeenCalledWith(mockUserEntity);
            expect(result).toEqual(mockUser);
        });

        it('should throw a DatabaseException when save fails', async () => {
            const error = new Error('Database error');
            mockRepository.save.mockRejectedValue(error);

            await expect(userInfrastructure.save(mockUser)).rejects.toThrow(DatabaseException);
            expect(DatabaseBootstrap.datasource.getRepository).toHaveBeenCalledWith(UserEntity);
        });
    });

    describe('findById', () => {
        it('should find a user by id successfully', async () => {
            mockRepository.findOne.mockResolvedValue(mockUserEntity);

            const result = await userInfrastructure.findById(1);

            expect(DatabaseBootstrap.datasource.getRepository).toHaveBeenCalledWith(UserEntity);
            expect(mockRepository.findOne).toHaveBeenCalledWith({
                where: { userId: 1, deletedAt: IsNull() }
            });
            expect(UserDto.fromDataToDomain).toHaveBeenCalledWith(mockUserEntity);
            expect(result).toEqual(mockUser);
        });

        it('should return null when user is not found', async () => {
            mockRepository.findOne.mockResolvedValue(null);

            const result = await userInfrastructure.findById(999);

            expect(result).toBeNull();
            expect(DatabaseBootstrap.datasource.getRepository).toHaveBeenCalledWith(UserEntity);
            expect(mockRepository.findOne).toHaveBeenCalledWith({
                where: { userId: 999, deletedAt: IsNull() }
            });
        });

        it('should throw a DatabaseException when find fails', async () => {
            const error = new Error('Database error');
            mockRepository.findOne.mockRejectedValue(error);

            await expect(userInfrastructure.findById(1)).rejects.toThrow(DatabaseException);
            expect(DatabaseBootstrap.datasource.getRepository).toHaveBeenCalledWith(UserEntity);
        });
    });

    describe('findByEmail', () => {
        it('should find a user by email successfully', async () => {
            mockRepository.findOne.mockResolvedValue(mockUserEntity);

            const result = await userInfrastructure.findByEmail('test@example.com');

            expect(DatabaseBootstrap.datasource.getRepository).toHaveBeenCalledWith(UserEntity);
            expect(mockRepository.findOne).toHaveBeenCalledWith({
                where: { email: 'test@example.com', deletedAt: IsNull() }
            });
            expect(UserDto.fromDataToDomain).toHaveBeenCalledWith(mockUserEntity);
            expect(result).toEqual(mockUser);
        });

        it('should return null when user is not found by email', async () => {
            mockRepository.findOne.mockResolvedValue(null);

            const result = await userInfrastructure.findByEmail('nonexistent@example.com');

            expect(result).toBeNull();
            expect(DatabaseBootstrap.datasource.getRepository).toHaveBeenCalledWith(UserEntity);
        });

        it('should throw a DatabaseException when findByEmail fails', async () => {
            const error = new Error('Database error');
            mockRepository.findOne.mockRejectedValue(error);

            await expect(userInfrastructure.findByEmail('test@example.com')).rejects.toThrow(DatabaseException);
            expect(DatabaseBootstrap.datasource.getRepository).toHaveBeenCalledWith(UserEntity);
        });
    });

    describe('getAll', () => {
        it('should get all users successfully', async () => {
            const userEntities = [mockUserEntity, mockUserEntity];
            mockRepository.find.mockResolvedValue(userEntities);

            const result = await userInfrastructure.getAll();

            expect(DatabaseBootstrap.datasource.getRepository).toHaveBeenCalledWith(UserEntity);
            expect(mockRepository.find).toHaveBeenCalledWith({ where: { deletedAt: IsNull() } });
            expect(UserDto.fromDataToDomain).toHaveBeenCalledWith(userEntities);
            expect(result).toEqual(mockUser);
        });

        it('should throw a DatabaseException when getAll fails', async () => {
            const error = new Error('Database error');
            mockRepository.find.mockRejectedValue(error);

            await expect(userInfrastructure.getAll()).rejects.toThrow(DatabaseException);
            expect(DatabaseBootstrap.datasource.getRepository).toHaveBeenCalledWith(UserEntity);
        });
    });

    describe('getByPage', () => {
        it('should get users by page successfully', async () => {
            const userEntities = [mockUserEntity, mockUserEntity];
            const total = 10;
            const page = 1;
            const limit = 2;
            mockRepository.findAndCount.mockResolvedValue([userEntities, total]);
            
            // Configurar el mock para devolver un array de usuarios cuando se llama con un array de entidades
            (UserDto.fromDataToDomain as jest.Mock).mockReturnValue([mockUser, mockUser]);

            const result = await userInfrastructure.getByPage(page, limit);

            expect(DatabaseBootstrap.datasource.getRepository).toHaveBeenCalledWith(UserEntity);
            expect(mockRepository.findAndCount).toHaveBeenCalledWith({
                where: { deletedAt: IsNull() },
                skip: (page - 1) * limit,
                take: limit,
            });
            expect(UserDto.fromDataToDomain).toHaveBeenCalledWith(userEntities);
            expect(result).toEqual({
                total,
                page,
                limit,
                data: [mockUser, mockUser]
            } as ResponseByPage<User>);
        });

        it('should throw a DatabaseException when getByPage fails', async () => {
            const error = new Error('Database error');
            mockRepository.findAndCount.mockRejectedValue(error);

            await expect(userInfrastructure.getByPage(1, 10)).rejects.toThrow(DatabaseException);
            expect(DatabaseBootstrap.datasource.getRepository).toHaveBeenCalledWith(UserEntity);
        });
    });
});