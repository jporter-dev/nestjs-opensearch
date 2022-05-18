import { ClientOptions } from '@opensearch-project/opensearch';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export type OpensearchModuleOptions = ClientOptions;

export interface OpensearchOptionsFactory {
  createOpensearchOptions():
    | Promise<OpensearchModuleOptions>
    | OpensearchModuleOptions;
}

export interface OpensearchModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<OpensearchOptionsFactory>;
  useClass?: Type<OpensearchOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<OpensearchModuleOptions> | OpensearchModuleOptions;
  inject?: any[];
}
