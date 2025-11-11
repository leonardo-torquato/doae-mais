<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).


Combinado. Este é o sprint final para o back-end. Você está com a fundação pronta (Etapa 1) e agora vamos construir toda a lógica de API (Etapa 3) em cima dela.

O objetivo é criar os **Controllers** (que definem as rotas, ex: `/needs`) e os **Services** (que contêm a lógica e falam com o banco de dados) para cada um dos seus módulos.

Vamos implementar os endpoints públicos essenciais que o seu front-end precisa para o fluxo de usuário:

1.  `GET /donation-categories`: Para alimentar o dropdown de "Tipo de Doação".
2.  `GET /needs`: Para listar as "Necessidades" na página `/needs`.
3.  `POST /donations`: Para o formulário do "Doador" enviar uma nova doação.

-----

### Passo 1: Configurar CORS e Validação Global

Primeiro, precisamos dizer ao seu back-end para aceitar requisições do seu front-end (que rodará em outra porta) e para validar automaticamente os dados que chegam.

**Edite o arquivo `backend/src/main.ts`**:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // 1. Importe o ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 2. Habilite o CORS
  // Isso permite que o seu front-end (ex: localhost:3001) 
  // faça requisições para o seu back-end (localhost:3000)
  app.enableCors();

  // 3. Habilite o ValidationPipe Global
  // Isso garante que todos os dados que chegam nos controllers
  // sejam validados automaticamente pelos nossos DTOs.
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove propriedades que não estão no DTO
    forbidNonWhitelisted: true, // Lança erro se propriedades extras forem enviadas
    transform: true, // Transforma o payload para o tipo do DTO (ex: string para number)
  }));

  // 4. (Opcional) Adicione um prefixo global de API
  // Suas rotas serão /api/needs, /api/donations, etc.
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

-----

### Passo 2: Implementar o Módulo `DonationCategories` (GET)

Vamos criar o endpoint para o front-end buscar os tipos de doação.

**1. Crie o Service (`backend/src/donation_categories/donation_categories.service.ts`):**
(Este arquivo não existe, crie-o)

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DonationCategory } from './entities/category.entity';

@Injectable()
export class DonationCategoriesService {
  constructor(
    @InjectRepository(DonationCategory)
    private readonly categoryRepository: Repository<DonationCategory>,
  ) {}

  // Lógica para buscar todas as categorias
  findAll(): Promise<DonationCategory[]> {
    return this.categoryRepository.find();
  }
}
```

**2. Crie o Controller (`backend/src/donation_categories/donation_categories.controller.ts`):**
(Este arquivo não existe, crie-o)

```typescript
import { Controller, Get } from '@nestjs/common';
import { DonationCategoriesService } from './donation_categories.service';

@Controller('donation-categories') // Rota: /api/donation-categories
export class DonationCategoriesController {
  constructor(private readonly categoriesService: DonationCategoriesService) {}

  @Get() // Mapeia para GET /api/donation-categories
  findAll() {
    return this.categoriesService.findAll();
  }
}
```

**3. Atualize o Módulo (`backend/src/donation_categories/donation_categories.module.ts`):**
(Adicione o `Controller` e o `Service` ao arquivo)

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationCategory } from './entities/category.entity';
import { DonationCategoriesController } from './donation_categories.controller';
import { DonationCategoriesService } from './donation_categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([DonationCategory])],
  controllers: [DonationCategoriesController], // 1. Adicione o Controller
  providers: [DonationCategoriesService], // 2. Adicione o Service
})
export class DonationCategoriesModule {}
```

-----

### Passo 3: Implementar o Módulo `Needs` (GET)

Exatamente o mesmo processo, mas para `Needs`.

**1. Crie o Service (`backend/src/needs/needs.service.ts`):**
(Este arquivo não existe, crie-o)

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Need } from './entities/need.entity';

@Injectable()
export class NeedsService {
  constructor(
    @InjectRepository(Need)
    private readonly needRepository: Repository<Need>,
  ) {}

  // Lógica para buscar todas as necessidades
  findAll(): Promise<Need[]> {
    // Ordena pelas mais recentes (opcional, mas bom)
    return this.needRepository.find({ order: { id: 'DESC' } });
  }
}
```

**2. Crie o Controller (`backend/src/needs/needs.controller.ts`):**
(Este arquivo não existe, crie-o)

```typescript
import { Controller, Get } from '@nestjs/common';
import { NeedsService } from './needs.service';

@Controller('needs') // Rota: /api/needs
export class NeedsController {
  constructor(private readonly needsService: NeedsService) {}

  @Get() // Mapeia para GET /api/needs
  findAll() {
    return this.needsService.findAll();
  }
}
```

**3. Atualize o Módulo (`backend/src/needs/needs.module.ts`):**
(Adicione o `Controller` e o `Service` ao arquivo)

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Need } from './entities/need.entity';
import { NeedsController } from './needs.controller';
import { NeedsService } from './needs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Need])],
  controllers: [NeedsController], // 1. Adicione o Controller
  providers: [NeedsService], // 2. Adicione o Service
})
export class NeedsModule {}
```

-----

### Passo 4: Implementar o Módulo `Donations` (POST)

Este é o mais importante e um pouco mais complexo. Ele precisa de um **DTO (Data Transfer Object)** para validar os dados que chegam do formulário do Doador.

**1. Crie o DTO (`backend/src/donations/dto/create-donation.dto.ts`):**
(Crie a pasta `dto` e o arquivo dentro dela)

```typescript
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDonationDto {
  @IsString()
  @IsNotEmpty()
  description: string; // "5kg de arroz"

  @IsInt() // Garante que é um número inteiro
  categoryId: number; // O ID da DonationCategory

  @IsInt()
  @IsOptional() // Opcional, pois uma doação pode não ser para uma 'Need' específica
  needId?: number;
}
```

**2. Crie o Service (`backend/src/donations/donations.service.ts`):**
(Este arquivo não existe, crie-o)

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donation } from './entities/donation.entity';
import { DonationCategory } from '../donation_categories/entities/category.entity';
import { Need } from '../needs/entities/need.entity';
import { CreateDonationDto } from './dto/create-donation.dto';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donation)
    private readonly donationRepository: Repository<Donation>,
    
    // Precisamos dos outros repositórios para validar os IDs
    @InjectRepository(DonationCategory)
    private readonly categoryRepository: Repository<DonationCategory>,
    
    @InjectRepository(Need)
    private readonly needRepository: Repository<Need>,
  ) {}

  async create(createDonationDto: CreateDonationDto): Promise<Donation> {
    const { categoryId, needId, description } = createDonationDto;

    // 1. Valida se a Categoria existe
    const category = await this.categoryRepository.findOneBy({ id: categoryId });
    if (!category) {
      throw new NotFoundException(`Categoria com ID ${categoryId} não encontrada.`);
    }

    let need: Need | null = null;
    // 2. Valida se a Necessidade (Need) existe, se for informada
    if (needId) {
      need = await this.needRepository.findOneBy({ id: needId });
      if (!need) {
        throw new NotFoundException(`Necessidade com ID ${needId} não encontrada.`);
      }
    }

    // 3. Cria a nova doação
    const newDonation = this.donationRepository.create({
      description,
      category: category,
      need: need, // Será null se needId não for fornecido
      status: 'pendente', //
    });

    // 4. Salva no banco
    return this.donationRepository.save(newDonation);
  }
}
```

**3. Crie o Controller (`backend/src/donations/donations.controller.ts`):**
(Este arquivo não existe, crie-o)

```typescript
import { Controller, Post, Body } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Controller('donations') // Rota: /api/donations
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post() // Mapeia para POST /api/donations
  create(@Body() createDonationDto: CreateDonationDto) {
    // O ValidationPipe em main.ts valida o DTO automaticamente
    return this.donationsService.create(createDonationDto);
  }
}
```

**4. Atualize o Módulo (`backend/src/donations/donations.module.ts`):**
(Este é o mais importante)

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';
import { DonationsController } from './donations.controller';
import { DonationsService } from './donations.service';

// Importe as Entidades que o Service precisa validar
import { DonationCategory } from '../donation_categories/entities/category.entity';
import { Need } from '../needs/entities/need.entity';

@Module({
  imports: [
    // Importe TODAS as entidades que o DonationsService vai usar
    TypeOrmModule.forFeature([Donation, DonationCategory, Need]),
  ],
  controllers: [DonationsController], // Adicione o Controller
  providers: [DonationsService], // Adicione o Service
})
export class DonationsModule {}
```

-----

### Resumo e Próximo Passo

Pare o servidor (Ctrl+C) e rode `npm run start:dev` novamente.

Se não houver erros, seu back-end agora está totalmente funcional para o fluxo de usuário público\! Você tem os seguintes endpoints prontos:

  * `GET /api/donation-categories` (Lista todas as categorias)
  * `GET /api/needs` (Lista todas as necessidades)
  * `POST /api/donations` (Cria uma nova doação)

O back-end está pronto para a **Etapa 4: Conectar o Front-End**. Vamos fazer seu React falar com essa API.