import 'server-only';
import { catalogV1 } from './catalog-v1.server';
import { eventPolicyV1 } from './policy-v1';
import { catalogV2 } from './catalog-v2.server';
import { eventPolicyV2 } from './policy-v2';
import { eventPolicyV3 } from './policy-v3';
import { eventPolicyV4 } from './policy-v4';
import { catalogV3 } from './catalog-v3.server';
import { validateCatalogPolicy } from '../../../lib/simulator/events/validate';
import { catalogReport } from '../../../lib/simulator/events/life-report';

validateCatalogPolicy(catalogV1, eventPolicyV1);
validateCatalogPolicy(catalogV2, eventPolicyV2);
validateCatalogPolicy(catalogV3, eventPolicyV4);
catalogReport(catalogV2,eventPolicyV2);
export function eventCatalog(version: number) {
  if (version === 3) return catalogV3;
  if (version === 2) return catalogV2;
  if (version !== 1) throw new Error('Unsupported event catalog');
  return catalogV1;
}
export function eventPolicy(version: number) {
  if (version === 4) return structuredClone(eventPolicyV4);
  if (version === 3) return structuredClone(eventPolicyV3);
  if (version === 2) return structuredClone(eventPolicyV2);
  if (version !== 1) throw new Error('Unsupported event policy');
  return structuredClone(eventPolicyV1);
}
