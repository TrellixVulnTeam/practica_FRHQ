/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Extract i18n messages from source code
 */
import { analyzeAndValidateNgModules } from '../aot/compiler';
import { createAotUrlResolver } from '../aot/compiler_factory';
import { StaticReflector } from '../aot/static_reflector';
import { StaticSymbolCache } from '../aot/static_symbol';
import { StaticSymbolResolver } from '../aot/static_symbol_resolver';
import { AotSummaryResolver } from '../aot/summary_resolver';
import { CompilerConfig } from '../config';
import { ViewEncapsulation } from '../core';
import { DirectiveNormalizer } from '../directive_normalizer';
import { DirectiveResolver } from '../directive_resolver';
import { CompileMetadataResolver } from '../metadata_resolver';
import { HtmlParser } from '../ml_parser/html_parser';
import { InterpolationConfig } from '../ml_parser/interpolation_config';
import { NgModuleResolver } from '../ng_module_resolver';
import { PipeResolver } from '../pipe_resolver';
import { DomElementSchemaRegistry } from '../schema/dom_element_schema_registry';
import { MessageBundle } from './message_bundle';
export class Extractor {
    constructor(host, staticSymbolResolver, messageBundle, metadataResolver) {
        this.host = host;
        this.staticSymbolResolver = staticSymbolResolver;
        this.messageBundle = messageBundle;
        this.metadataResolver = metadataResolver;
    }
    extract(rootFiles) {
        const { files, ngModules } = analyzeAndValidateNgModules(rootFiles, this.host, this.staticSymbolResolver, this.metadataResolver);
        return Promise
            .all(ngModules.map(ngModule => this.metadataResolver.loadNgModuleDirectiveAndPipeMetadata(ngModule.type.reference, false)))
            .then(() => {
            const errors = [];
            files.forEach(file => {
                const compMetas = [];
                file.directives.forEach(directiveType => {
                    const dirMeta = this.metadataResolver.getDirectiveMetadata(directiveType);
                    if (dirMeta && dirMeta.isComponent) {
                        compMetas.push(dirMeta);
                    }
                });
                compMetas.forEach(compMeta => {
                    const html = compMeta.template.template;
                    // Template URL points to either an HTML or TS file depending on
                    // whether the file is used with `templateUrl:` or `template:`,
                    // respectively.
                    const templateUrl = compMeta.template.templateUrl;
                    const interpolationConfig = InterpolationConfig.fromArray(compMeta.template.interpolation);
                    errors.push(...this.messageBundle.updateFromTemplate(html, templateUrl, interpolationConfig));
                });
            });
            if (errors.length) {
                throw new Error(errors.map(e => e.toString()).join('\n'));
            }
            return this.messageBundle;
        });
    }
    static create(host, locale) {
        const htmlParser = new HtmlParser();
        const urlResolver = createAotUrlResolver(host);
        const symbolCache = new StaticSymbolCache();
        const summaryResolver = new AotSummaryResolver(host, symbolCache);
        const staticSymbolResolver = new StaticSymbolResolver(host, symbolCache, summaryResolver);
        const staticReflector = new StaticReflector(summaryResolver, staticSymbolResolver);
        const config = new CompilerConfig({ defaultEncapsulation: ViewEncapsulation.Emulated, useJit: false });
        const normalizer = new DirectiveNormalizer({ get: (url) => host.loadResource(url) }, urlResolver, htmlParser, config);
        const elementSchemaRegistry = new DomElementSchemaRegistry();
        const resolver = new CompileMetadataResolver(config, htmlParser, new NgModuleResolver(staticReflector), new DirectiveResolver(staticReflector), new PipeResolver(staticReflector), summaryResolver, elementSchemaRegistry, normalizer, console, symbolCache, staticReflector);
        // TODO(vicb): implicit tags & attributes
        const messageBundle = new MessageBundle(htmlParser, [], {}, locale);
        const extractor = new Extractor(host, staticSymbolResolver, messageBundle, resolver);
        return { extractor, staticReflector };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL2kxOG4vZXh0cmFjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdIOztHQUVHO0FBQ0gsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDN0QsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxvQkFBb0IsRUFBMkIsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RixPQUFPLEVBQUMsa0JBQWtCLEVBQXlCLE1BQU0seUJBQXlCLENBQUM7QUFFbkYsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUN6QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDMUMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDN0QsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRXZELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUUvRSxPQUFPLEVBQUMs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Ii8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5cbi8qKlxuICogRXh0cmFjdCBpMThuIG1lc3NhZ2VzIGZyb20gc291cmNlIGNvZGVcbiAqL1xuaW1wb3J0IHthbmFseXplQW5kVmFsaWRhdGVOZ01vZHVsZXN9IGZyb20gJy4uL2FvdC9jb21waWxlcic7XG5pbXBvcnQge2NyZWF0ZUFvdFVybFJlc29sdmVyfSBmcm9tICcuLi9hb3QvY29tcGlsZXJfZmFjdG9yeSc7XG5pbXBvcnQge1N0YXRpY1JlZmxlY3Rvcn0gZnJvbSAnLi4vYW90L3N0YXRpY19yZWZsZWN0b3InO1xuaW1wb3J0IHtTdGF0aWNTeW1ib2xDYWNoZX0gZnJvbSAnLi4vYW90L3N0YXRpY19zeW1ib2wnO1xuaW1wb3J0IHtTdGF0aWNTeW1ib2xSZXNvbHZlciwgU3RhdGljU3ltYm9sUmVzb2x2ZXJIb3N0fSBmcm9tICcuLi9hb3Qvc3RhdGljX3N5bWJvbF9yZXNvbHZlcic7XG5pbXBvcnQge0FvdFN1bW1hcnlSZXNvbHZlciwgQW90U3VtbWFyeVJlc29sdmVySG9zdH0gZnJvbSAnLi4vYW90L3N1bW1hcnlfcmVzb2x2ZXInO1xuaW1wb3J0IHtDb21waWxlRGlyZWN0aXZlTWV0YWRhdGF9IGZyb20gJy4uL2NvbXBpbGVfbWV0YWRhdGEnO1xuaW1wb3J0IHtDb21waWxlckNvbmZpZ30gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB7Vmlld0VuY2Fwc3VsYXRpb259IGZyb20gJy4uL2NvcmUnO1xuaW1wb3J0IHtEaXJlY3RpdmVOb3JtYWxpemVyfSBmcm9tICcuLi9kaXJlY3RpdmVfbm9ybWFsaXplcic7XG5pbXBvcnQge0RpcmVjdGl2ZVJlc29sdmVyfSBmcm9tICcuLi9kaXJlY3RpdmVfcmVzb2x2ZXInO1xuaW1wb3J0IHtDb21waWxlTWV0YWRhdGFSZXNvbHZlcn0gZnJvbSAnLi4vbWV0YWRhdGFfcmVzb2x2ZXInO1xuaW1wb3J0IHtIdG1sUGFyc2VyfSBmcm9tICcuLi9tbF9wYXJzZXIvaHRtbF9wYXJzZXInO1xuaW1wb3J0IHtJbnRlcnBvbGF0aW9uQ29uZmlnfSBmcm9tICcuLi9tbF9wYXJzZXIvaW50ZXJwb2xhdGlvbl9jb25maWcnO1xuaW1wb3J0IHtOZ01vZHVsZVJlc29sdmVyfSBmcm9tICcuLi9uZ19tb2R1bGVfcmVzb2x2ZXInO1xuaW1wb3J0IHtQYXJzZUVycm9yfSBmcm9tICcuLi9wYXJzZV91dGlsJztcbmltcG9ydCB7UGlwZVJlc29sdmVyfSBmcm9tICcuLi9waXBlX3Jlc29sdmVyJztcbmltcG9ydCB7RG9tRWxlbWVudFNjaGVtYVJlZ2lzdHJ5fSBmcm9tICcuLi9zY2hlbWEvZG9tX2VsZW1lbnRfc2NoZW1hX3JlZ2lzdHJ5JztcblxuaW1wb3J0IHtNZXNzYWdlQnVuZGxlfSBmcm9tICcuL21lc3NhZ2VfYnVuZGxlJztcblxuXG5cbi8qKlxuICogVGhlIGhvc3Qgb2YgdGhlIEV4dHJhY3RvciBkaXNjb25uZWN0cyB0aGUgaW1wbGVtZW50YXRpb24gZnJvbSBUeXBlU2NyaXB0IC8gb3RoZXIgbGFuZ3VhZ2VcbiAqIHNlcnZpY2VzIGFuZCBmcm9tIHVuZGVybHlpbmcgZmlsZSBzeXN0ZW1zLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEV4dHJhY3Rvckhvc3QgZXh0ZW5kcyBTdGF0aWNTeW1ib2xSZXNvbHZlckhvc3QsIEFvdFN1bW1hcnlSZXNvbHZlckhvc3Qge1xuICAvKipcbiAgICogQ29udmVydHMgYSBwYXRoIHRoYXQgcmVmZXJzIHRvIGEgcmVzb3VyY2UgaW50byBhbiBhYnNvbHV0ZSBmaWxlUGF0aFxuICAgKiB0aGF0IGNhbiBiZSBsYXRlciBvbiB1c2VkIGZvciBsb2FkaW5nIHRoZSByZXNvdXJjZSB2aWEgYGxvYWRSZXNvdXJjZS5cbiAgICovXG4gIHJlc291cmNlTmFtZVRvRmlsZU5hbWUocGF0aDogc3RyaW5nLCBjb250YWluaW5nRmlsZTogc3RyaW5nKTogc3RyaW5nfG51bGw7XG4gIC8qKlxuICAgKiBMb2FkcyBhIHJlc291cmNlIChlLmcuIGh0bWwgLyBjc3MpXG4gICAqL1xuICBsb2FkUmVzb3VyY2UocGF0aDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+fHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEV4dHJhY3RvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIGhvc3Q6IEV4dHJhY3Rvckhvc3QsIHByaXZhdGUgc3RhdGljU3ltYm9sUmVzb2x2ZXI6IFN0YXRpY1N5bWJvbFJlc29sdmVyLFxuICAgICAgcHJpdmF0ZSBtZXNzYWdlQnVuZGxlOiBNZXNzYWdlQnVuZGxlLCBwcml2YXRlIG1ldGFkYXRhUmVzb2x2ZXI6IENvbXBpbGVNZXRhZGF0YVJlc29sdmVyKSB7fVxuXG4gIGV4dHJhY3Qocm9vdEZpbGVzOiBzdHJpbmdbXSk6IFByb21pc2U8TWVzc2FnZUJ1bmRsZT4ge1xuICAgIGNvbnN0IHtmaWxlcywgbmdNb2R1bGVzfSA9IGFuYWx5emVBbmRWYWxpZGF0ZU5nTW9kdWxlcyhcbiAgICAgICAgcm9vdEZpbGVzLCB0aGlzLmhvc3QsIHRoaXMuc3RhdGljU3ltYm9sUmVzb2x2ZXIsIHRoaXMubWV0YWRhdGFSZXNvbHZlcik7XG4gICAgcmV0dXJuIFByb21pc2VcbiAgICAgICAgLmFsbChuZ01vZHVsZXMubWFwKFxuICAgICAgICAgICAgbmdNb2R1bGUgPT4gdGhpcy5tZXRhZGF0YVJlc29sdmVyLmxvYWROZ01vZHVsZURpcmVjdGl2ZUFuZFBpcGVNZXRhZGF0YShcbiAgICAgICAgICAgICAgICBuZ01vZHVsZS50eXBlLnJlZmVyZW5jZSwgZmFsc2UpKSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGVycm9yczogUGFyc2VFcnJvcltdID0gW107XG5cbiAgICAgICAgICBmaWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29tcE1ldGFzOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGFbXSA9IFtdO1xuICAgICAgICAgICAgZmlsZS5kaXJlY3RpdmVzLmZvckVhY2goZGlyZWN0aXZlVHlwZSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGRpck1ldGEgPSB0aGlzLm1ldGFkYXRhUmVzb2x2ZXIuZ2V0RGlyZWN0aXZlTWV0YWRhdGEoZGlyZWN0aXZlVHlwZSk7XG4gICAgICAgICAgICAgIGlmIChkaXJNZXRhICYmIGRpck1ldGEuaXNDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICBjb21wTWV0YXMucHVzaChkaXJNZXRhKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb21wTWV0YXMuZm9yRWFjaChjb21wTWV0YSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGh0bWwgPSBjb21wTWV0YS50ZW1wbGF0ZSAhLnRlbXBsYXRlICE7XG4gICAgICAgICAgICAgIC8vIFRlbXBsYXRlIFVSTCBwb2ludHMgdG8gZWl0aGVyIGFuIEhUTUwgb3IgVFMgZmlsZSBkZXBlbmRpbmcgb25cbiAgICAgICAgICAgICAgLy8gd2hldGhlciB0aGUgZmlsZSBpcyB1c2VkIHdpdGggYHRlbXBsYXRlVXJsOmAgb3IgYHRlbXBsYXRlOmAsXG4gICAgICAgICAgICAgIC8vIHJlc3BlY3RpdmVseS5cbiAgICAgICAgICAgICAgY29uc3QgdGVtcGxhdGVVcmwgPSBjb21wTWV0YS50ZW1wbGF0ZSAhLnRlbXBsYXRlVXJsITtcbiAgICAgICAgICAgICAgY29uc3QgaW50ZXJwb2xhdGlvbkNvbmZpZyA9XG4gICAgICAgICAgICAgICAgICBJbnRlcnBvbGF0aW9uQ29uZmlnLmZyb21BcnJheShjb21wTWV0YS50ZW1wbGF0ZSAhLmludGVycG9sYXRpb24pO1xuICAgICAgICAgICAgICBlcnJvcnMucHVzaCguLi50aGlzLm1lc3NhZ2VCdW5kbGUudXBkYXRlRnJvbVRlbXBsYXRlKFxuICAgICAgICAgICAgICAgICAgaHRtbCwgdGVtcGxhdGVVcmwsIGludGVycG9sYXRpb25Db25maWcpISk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmIChlcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JzLm1hcChlID0+IGUudG9TdHJpbmcoKSkuam9pbignXFxuJykpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VCdW5kbGU7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZShob3N0OiBFeHRyYWN0b3JIb3N0LCBsb2NhbGU6IHN0cmluZ3xudWxsKTpcbiAgICAgIHtleHRyYWN0b3I6IEV4dHJhY3Rvciwgc3RhdGljUmVmbGVjdG9yOiBTdGF0aWNSZWZsZWN0b3J9IHtcbiAgICBjb25zdCBodG1sUGFyc2VyID0gbmV3IEh0bWxQYXJzZXIoKTtcblxuICAgIGNvbnN0IHVybFJlc29sdmVyID0gY3JlYXRlQW90VXJsUmVzb2x2ZXIoaG9zdCk7XG4gICAgY29uc3Qgc3ltYm9sQ2FjaGUgPSBuZXcgU3RhdGljU3ltYm9sQ2FjaGUoKTtcbiAgICBjb25zdCBzdW1tYXJ5UmVzb2x2ZXIgPSBuZXcgQW90U3VtbWFyeVJlc29sdmVyKGhvc3QsIHN5bWJvbENhY2hlKTtcbiAgICBjb25zdCBzdGF0aWNTeW1ib2xSZXNvbHZlciA9IG5ldyBTdGF0aWNTeW1ib2xSZXNvbHZlcihob3N0LCBzeW1ib2xDYWNoZSwgc3VtbWFyeVJlc29sdmVyKTtcbiAgICBjb25zdCBzdGF0aWNSZWZsZWN0b3IgPSBuZXcgU3RhdGljUmVmbGVjdG9yKHN1bW1hcnlSZXNvbHZlciwgc3RhdGljU3ltYm9sUmVzb2x2ZXIpO1xuXG4gICAgY29uc3QgY29uZmlnID1cbiAgICAgICAgbmV3IENvbXBpbGVyQ29uZmlnKHtkZWZhdWx0RW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uRW11bGF0ZWQsIHVzZUppdDogZmFsc2V9KTtcblxuICAgIGNvbnN0IG5vcm1hbGl6ZXIgPSBuZXcgRGlyZWN0aXZlTm9ybWFsaXplcihcbiAgICAgICAge2dldDogKHVybDogc3RyaW5nKSA9PiBob3N0LmxvYWRSZXNvdXJjZSh1cmwpfSwgdXJsUmVzb2x2ZXIsIGh0bWxQYXJzZXIsIGNvbmZpZyk7XG4gICAgY29uc3QgZWxlbWVudFNjaGVtYVJlZ2lzdHJ5ID0gbmV3IERvbUVsZW1lbnRTY2hlbWFSZWdpc3RyeSgpO1xuICAgIGNvbnN0IHJlc29sdmVyID0gbmV3IENvbXBpbGVNZXRhZGF0YVJlc29sdmVyKFxuICAgICAgICBjb25maWcsIGh0bWxQYXJzZXIsIG5ldyBOZ01vZHVsZVJlc29sdmVyKHN0YXRpY1JlZmxlY3RvciksXG4gICAgICAgIG5ldyBEaXJlY3RpdmVSZXNvbHZlcihzdGF0aWNSZWZsZWN0b3IpLCBuZXcgUGlwZVJlc29sdmVyKHN0YXRpY1JlZmxlY3RvciksIHN1bW1hcnlSZXNvbHZlcixcbiAgICAgICAgZWxlbWVudFNjaGVtYVJlZ2lzdHJ5LCBub3JtYWxpemVyLCBjb25zb2xlLCBzeW1ib2xDYWNoZSwgc3RhdGljUmVmbGVjdG9yKTtcblxuICAgIC8vIFRPRE8odmljYik6IGltcGxpY2l0IHRhZ3MgJiBhdHRyaWJ1dGVzXG4gICAgY29uc3QgbWVzc2FnZUJ1bmRsZSA9IG5ldyBNZXNzYWdlQnVuZGxlKGh0bWxQYXJzZXIsIFtdLCB7fSwgbG9jYWxlKTtcblxuICAgIGNvbnN0IGV4dHJhY3RvciA9IG5ldyBFeHRyYWN0b3IoaG9zdCwgc3RhdGljU3ltYm9sUmVzb2x2ZXIsIG1lc3NhZ2VCdW5kbGUsIHJlc29sdmVyKTtcbiAgICByZXR1cm4ge2V4dHJhY3Rvciwgc3RhdGljUmVmbGVjdG9yfTtcbiAgfVxufVxuIl19