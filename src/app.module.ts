import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pets/pet.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // Specify the Apollo driver
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Define schema path
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory',
      entities: [Pet],
      synchronize: true, //not for production, migrations instead
    }),
    PetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
