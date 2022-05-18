import { DynamicModule, Module, Provider } from '@nestjs/common';
import { OPENSEARCH_MODULE_OPTIONS } from './opensearch.constants';
import { OpensearchService } from './opensearch.service';
import {
  OpensearchModuleAsyncOptions,
  OpensearchModuleOptions,
  OpensearchOptionsFactory
} from './interfaces/opensearch-module-options.interface';

@Module({
  providers: [OpensearchService],
  exports: [OpensearchService]
})
export class OpensearchModule {
  static register(options: OpensearchModuleOptions): DynamicModule {
    return {
      module: OpensearchModule,
      providers: [{ provide: OPENSEARCH_MODULE_OPTIONS, useValue: options }]
    };
  }

  static registerAsync(
    options: OpensearchModuleAsyncOptions
  ): DynamicModule {
    return {
      module: OpensearchModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options)]
    };
  }

  private static createAsyncProviders(
    options: OpensearchModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass
      }
    ];
  }

  private static createAsyncOptionsProvider(
    options: OpensearchModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: OPENSEARCH_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
    return {
      provide: OPENSEARCH_MODULE_OPTIONS,
      useFactory: async (optionsFactory: OpensearchOptionsFactory) =>
        await optionsFactory.createOpensearchOptions(),
      inject: [options.useExisting || options.useClass]
    };
  }
}
