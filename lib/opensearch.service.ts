import { Client, ClientOptions } from '@opensearch-project/opensearch';
import { Inject, Injectable, Optional } from '@nestjs/common';
import { OPENSEARCH_MODULE_OPTIONS } from './opensearch.constants';

@Injectable()
export class OpensearchService extends Client {
  constructor(
    @Optional() @Inject(OPENSEARCH_MODULE_OPTIONS) options: ClientOptions
  ) {
    super(options);
  }
}
