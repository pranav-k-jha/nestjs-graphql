import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pets/pet.entity';
import { OwnersModule } from './owners/owners.module';
import { Owner } from './owners/entities/owner.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // Specify the Apollo driver
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Define schema path
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory',
      entities: [Pet, Owner],
      synchronize: true, //not for production, migrations instead
    }),
    PetsModule,
    OwnersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
