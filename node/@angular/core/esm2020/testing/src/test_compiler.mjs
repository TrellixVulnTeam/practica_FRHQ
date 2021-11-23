/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Compiler, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
function unimplemented() {
    throw Error('unimplemented');
}
/**
 * Special interface to the compiler only used by testing
 *
 * @publicApi
 */
export class TestingCompiler extends Compiler {
    get injector() {
        throw unimplemented();
    }
    overrideModule(module, overrides) {
        throw unimplemented();
    }
    overrideDirective(directive, overrides) {
        throw unimplemented();
    }
    overrideComponent(component, overrides) {
        throw unimplemented();
    }
    overridePipe(directive, overrides) {
        throw unimplemented();
    }
    /**
     * Allows to pass the compile summary from AOT compilation to the JIT compiler,
     * so that it can use the code generated by AOT.
     */
    loadAotSummaries(summaries) {
        throw unimplemented();
    }
    /**
     * Gets the component factory for the given component.
     * This assumes that the component has been compiled before calling this call using
     * `compileModuleAndAllComponents*`.
     */
    getComponentFactory(component) {
        throw unimplemented();
    }
    /**
     * Returns the component type that is stored in the given error.
     * This can be used for errors created by compileModule...
     */
    getComponentFromError(error) {
        throw unimplemented();
    }
}
TestingCompiler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: TestingCompiler, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
TestingCompiler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: TestingCompiler });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: TestingCompiler, decorators: [{
            type: Injectable
        }] });
/**
 * A factory for creating a Compiler
 *
 * @publicApi
 */
export class TestingCompilerFactory {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9jb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvdGVzdGluZy9zcmMvdGVzdF9jb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUEyRCxVQUFVLEVBQWlDLE1BQU0sZUFBZSxDQUFDOztBQUk1SSxTQUFTLGFBQWE7SUFDcEIsTUFBTSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUVEOzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxRQUFRO0lBQzNDLElBQUksUUFBUTtRQUNWLE1BQU0sYUFBYSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNELGNBQWMsQ0FBQyxNQUFpQixFQUFFLFNBQXFDO1FBQ3JFLE1BQU0sYUFBYSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNELGlCQUFpQixDQUFDLFNBQW9CLEVBQUUsU0FBc0M7UUFDNUUsTUFBTSxhQUFhLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBQ0QsaUJBQWlCLENBQUMsU0FBb0IsRUFBRSxTQUFzQztRQUM1RSxNQUFNLGFBQWEsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFDRCxZQUFZLENBQUMsU0FBb0IsRUFBRSxTQUFpQztRQUNsRSxNQUFNLGFBQWEsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFDRDs7O09BR0c7SUFDSCxnQkFBZ0IsQ0FBQyxTQUFzQjtRQUNyQyxNQUFNLGFBQWEsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsbUJBQW1CLENBQUksU0FBa0I7UUFDdkMsTUFBTSxhQUFhLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gscUJBQXFCLENBQUMsS0FBWTtRQUNoQyxNQUFNLGFBQWEsRUFBRSxDQUFDO0lBQ3hCLENBQUM7O3VIQXZDVSxlQUFlOzJIQUFmLGVBQWU7c0dBQWYsZUFBZTtrQkFEM0IsVUFBVTs7QUEyQ1g7Ozs7R0FJRztBQUNILE1BQU0sT0FBZ0Isc0JBQXNCO0NBRTNDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcGlsZXIsIENvbXBpbGVyT3B0aW9ucywgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5LCBEaXJlY3RpdmUsIEluamVjdGFibGUsIEluamVjdG9yLCBOZ01vZHVsZSwgUGlwZSwgVHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TWV0YWRhdGFPdmVycmlkZX0gZnJvbSAnLi9tZXRhZGF0YV9vdmVycmlkZSc7XG5cbmZ1bmN0aW9uIHVuaW1wbGVtZW50ZWQoKTogYW55IHtcbiAgdGhyb3cgRXJyb3IoJ3VuaW1wbGVtZW50ZWQnKTtcbn1cblxuLyoqXG4gKiBTcGVjaWFsIGludGVyZmFjZSB0byB0aGUgY29tcGlsZXIgb25seSB1c2VkIGJ5IHRlc3RpbmdcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUZXN0aW5nQ29tcGlsZXIgZXh0ZW5kcyBDb21waWxlciB7XG4gIGdldCBpbmplY3RvcigpOiBJbmplY3RvciB7XG4gICAgdGhyb3cgdW5pbXBsZW1lbnRlZCgpO1xuICB9XG4gIG92ZXJyaWRlTW9kdWxlKG1vZHVsZTogVHlwZTxhbnk+LCBvdmVycmlkZXM6IE1ldGFkYXRhT3ZlcnJpZGU8TmdNb2R1bGU+KTogdm9pZCB7XG4gICAgdGhyb3cgdW5pbXBsZW1lbnRlZCgpO1xuICB9XG4gIG92ZXJyaWRlRGlyZWN0aXZlKGRpcmVjdGl2ZTogVHlwZTxhbnk+LCBvdmVycmlkZXM6IE1ldGFkYXRhT3ZlcnJpZGU8RGlyZWN0aXZlPik6IHZvaWQge1xuICAgIHRocm93IHVuaW1wbGVtZW50ZWQoKTtcbiAgfVxuICBvdmVycmlkZUNvbXBvbmVudChjb21wb25lbnQ6IFR5cGU8YW55Piwgb3ZlcnJpZGVzOiBNZXRhZGF0YU92ZXJyaWRlPENvbXBvbmVudD4pOiB2b2lkIHtcbiAgICB0aHJvdyB1bmltcGxlbWVudGVkKCk7XG4gIH1cbiAgb3ZlcnJpZGVQaXBlKGRpcmVjdGl2ZTogVHlwZTxhbnk+LCBvdmVycmlkZXM6IE1ldGFkYXRhT3ZlcnJpZGU8UGlwZT4pOiB2b2lkIHtcbiAgICB0aHJvdyB1bmltcGxlbWVudGVkKCk7XG4gIH1cbiAgLyoqXG4gICAqIEFsbG93cyB0byBwYXNzIHRoZSBjb21waWxlIHN1bW1hcnkgZnJvbSBBT1QgY29tcGlsYXRpb24gdG8gdGhlIEpJVCBjb21waWxlcixcbiAgICogc28gdGhhdCBpdCBjYW4gdXNlIHRoZSBjb2RlIGdlbmVyYXRlZCBieSBBT1QuXG4gICAqL1xuICBsb2FkQW90U3VtbWFyaWVzKHN1bW1hcmllczogKCkgPT4gYW55W10pIHtcbiAgICB0aHJvdyB1bmltcGxlbWVudGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgY29tcG9uZW50IGZhY3RvcnkgZm9yIHRoZSBnaXZlbiBjb21wb25lbnQuXG4gICAqIFRoaXMgYXNzdW1lcyB0aGF0IHRoZSBjb21wb25lbnQgaGFzIGJlZW4gY29tcGlsZWQgYmVmb3JlIGNhbGxpbmcgdGhpcyBjYWxsIHVzaW5nXG4gICAqIGBjb21waWxlTW9kdWxlQW5kQWxsQ29tcG9uZW50cypgLlxuICAgKi9cbiAgZ2V0Q29tcG9uZW50RmFjdG9yeTxUPihjb21wb25lbnQ6IFR5cGU8VD4pOiBDb21wb25lbnRGYWN0b3J5PFQ+IHtcbiAgICB0aHJvdyB1bmltcGxlbWVudGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29tcG9uZW50IHR5cGUgdGhhdCBpcyBzdG9yZWQgaW4gdGhlIGdpdmVuIGVycm9yLlxuICAgKiBUaGlzIGNhbiBiZSB1c2VkIGZvciBlcnJvcnMgY3JlYXRlZCBieSBjb21waWxlTW9kdWxlLi4uXG4gICAqL1xuICBnZXRDb21wb25lbnRGcm9tRXJyb3IoZXJyb3I6IEVycm9yKTogVHlwZTxhbnk+fG51bGwge1xuICAgIHRocm93IHVuaW1wbGVtZW50ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIEEgZmFjdG9yeSBmb3IgY3JlYXRpbmcgYSBDb21waWxlclxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFRlc3RpbmdDb21waWxlckZhY3Rvcnkge1xuICBhYnN0cmFjdCBjcmVhdGVUZXN0aW5nQ29tcGlsZXIob3B0aW9ucz86IENvbXBpbGVyT3B0aW9uc1tdKTogVGVzdGluZ0NvbXBpbGVyO1xufVxuIl19