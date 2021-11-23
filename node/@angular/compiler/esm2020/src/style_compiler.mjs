/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CompileStylesheetMetadata } from './compile_metadata';
import { ViewEncapsulation } from './core';
import * as o from './output/output_ast';
import { identifierModuleUrl, identifierName } from './parse_util';
import { ShadowCss } from './shadow_css';
const COMPONENT_VARIABLE = '%COMP%';
export const HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
export const CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;
export class StylesCompileDependency {
    constructor(name, moduleUrl, setValue) {
        this.name = name;
        this.moduleUrl = moduleUrl;
        this.setValue = setValue;
    }
}
export class CompiledStylesheet {
    constructor(outputCtx, stylesVar, dependencies, isShimmed, meta) {
        this.outputCtx = outputCtx;
        this.stylesVar = stylesVar;
        this.dependencies = dependencies;
        this.isShimmed = isShimmed;
        this.meta = meta;
    }
}
export class StyleCompiler {
    constructor(_urlResolver) {
        this._urlResolver = _urlResolver;
        this._shadowCss = new ShadowCss();
    }
    compileComponent(outputCtx, comp) {
        const template = comp.template;
        return this._compileStyles(outputCtx, comp, new CompileStylesheetMetadata({
            styles: template.styles,
            styleUrls: template.styleUrls,
            moduleUrl: identifierModuleUrl(comp.type)
        }), this.needsStyleShim(comp), true);
    }
    compileStyles(outputCtx, comp, stylesheet, shim = this.needsStyleShim(comp)) {
        return this._compileStyles(outputCtx, comp, stylesheet, shim, false);
    }
    needsStyleShim(comp) {
        return comp.template.encapsulation === ViewEncapsulation.Emulated;
    }
    _compileStyles(outputCtx, comp, stylesheet, shim, isComponentStylesheet) {
        const styleExpressions = stylesheet.styles.map(plainStyle => o.literal(this._shimIfNeeded(plainStyle, shim)));
        const dependencies = [];
        stylesheet.styleUrls.forEach((styleUrl) => {
            const exprIndex = styleExpressions.length;
            // Note: This placeholder will be filled later.
            styleExpressions.push(null);
            dependencies.push(new StylesCompileDependency(getStylesVarName(null), styleUrl, (value) => styleExpressions[exprIndex] = outputCtx.importExpr(value)));
        });
        // styles variable contains plain strings and arrays of other styles arrays (recursive),
        // so we set its type to dynamic.
        const stylesVar = getStylesVarName(isComponentStylesheet ? comp : null);
        const stmt = o.variable(stylesVar)
            .set(o.literalArr(styleExpressions, new o.ArrayType(o.DYNAMIC_TYPE, [o.TypeModifier.Const])))
            .toDeclStmt(null, isComponentStylesheet ? [o.StmtModifier.Final] : [
            o.StmtModifier.Final, o.StmtModifier.Exported
        ]);
        outputCtx.statements.push(stmt);
        return new CompiledStylesheet(outputCtx, stylesVar, dependencies, shim, stylesheet);
    }
    _shimIfNeeded(style, shim) {
        return shim ? this._shadowCss.shimCssText(style, CONTENT_ATTR, HOST_ATTR) : style;
    }
}
function getStylesVarName(component) {
    let result = `styles`;
    if (component) {
        result += `_${identifierName(component.type)}`;
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVfY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvc3R5bGVfY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUEyQix5QkFBeUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRXZGLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUN6QyxPQUFPLEtBQUssQ0FBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxtQkFBbUIsRUFBRSxjQUFjLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDakUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUd2QyxNQUFNLGtCQUFrQixHQUFHLFFBQVEsQ0FBQztBQUNwQyxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsV0FBVyxrQkFBa0IsRUFBRSxDQUFDO0FBQ3pELE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxjQUFjLGtCQUFrQixFQUFFLENBQUM7QUFFL0QsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQyxZQUNXLElBQVksRUFBUyxTQUFpQixFQUFTLFFBQThCO1FBQTdFLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBc0I7SUFBRyxDQUFDO0NBQzdGO0FBRUQsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixZQUNXLFNBQXdCLEVBQVMsU0FBaUIsRUFDbEQsWUFBdUMsRUFBUyxTQUFrQixFQUNsRSxJQUErQjtRQUYvQixjQUFTLEdBQVQsU0FBUyxDQUFlO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUNsRCxpQkFBWSxHQUFaLFlBQVksQ0FBMkI7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFTO1FBQ2xFLFNBQUksR0FBSixJQUFJLENBQTJCO0lBQUcs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QUFRO1NBQzlDLENBQUMsQ0FBQztRQUNwQixTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxPQUFPLElBQUksa0JBQWtCLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFTyxhQUFhLENBQUMsS0FBYSxFQUFFLElBQWE7UUFDaEQsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNwRixDQUFDO0NBQ0Y7QUFFRCxTQUFTLGdCQUFnQixDQUFDLFNBQXdDO0lBQ2hFLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQztJQUN0QixJQUFJLFNBQVMsRUFBRTtRQUNiLE1BQU0sSUFBSSxJQUFJLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztLQUNoRDtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsIENvbXBpbGVTdHlsZXNoZWV0TWV0YWRhdGF9IGZyb20gJy4vY29tcGlsZV9tZXRhZGF0YSc7XG5pbXBvcnQge091dHB1dENvbnRleHR9IGZyb20gJy4vY29uc3RhbnRfcG9vbCc7XG5pbXBvcnQge1ZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICcuL2NvcmUnO1xuaW1wb3J0ICogYXMgbyBmcm9tICcuL291dHB1dC9vdXRwdXRfYXN0JztcbmltcG9ydCB7aWRlbnRpZmllck1vZHVsZVVybCwgaWRlbnRpZmllck5hbWV9IGZyb20gJy4vcGFyc2VfdXRpbCc7XG5pbXBvcnQge1NoYWRvd0Nzc30gZnJvbSAnLi9zaGFkb3dfY3NzJztcbmltcG9ydCB7VXJsUmVzb2x2ZXJ9IGZyb20gJy4vdXJsX3Jlc29sdmVyJztcblxuY29uc3QgQ09NUE9ORU5UX1ZBUklBQkxFID0gJyVDT01QJSc7XG5leHBvcnQgY29uc3QgSE9TVF9BVFRSID0gYF9uZ2hvc3QtJHtDT01QT05FTlRfVkFSSUFCTEV9YDtcbmV4cG9ydCBjb25zdCBDT05URU5UX0FUVFIgPSBgX25nY29udGVudC0ke0NPTVBPTkVOVF9WQVJJQUJMRX1gO1xuXG5leHBvcnQgY2xhc3MgU3R5bGVzQ29tcGlsZURlcGVuZGVuY3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyBtb2R1bGVVcmw6IHN0cmluZywgcHVibGljIHNldFZhbHVlOiAodmFsdWU6IGFueSkgPT4gdm9pZCkge31cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBpbGVkU3R5bGVzaGVldCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIG91dHB1dEN0eDogT3V0cHV0Q29udGV4dCwgcHVibGljIHN0eWxlc1Zhcjogc3RyaW5nLFxuICAgICAgcHVibGljIGRlcGVuZGVuY2llczogU3R5bGVzQ29tcGlsZURlcGVuZGVuY3lbXSwgcHVibGljIGlzU2hpbW1lZDogYm9vbGVhbixcbiAgICAgIHB1YmxpYyBtZXRhOiBDb21waWxlU3R5bGVzaGVldE1ldGFkYXRhKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgU3R5bGVDb21waWxlciB7XG4gIHByaXZhdGUgX3NoYWRvd0NzczogU2hhZG93Q3NzID0gbmV3IFNoYWRvd0NzcygpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3VybFJlc29sdmVyOiBVcmxSZXNvbHZlcikge31cblxuICBjb21waWxlQ29tcG9uZW50KG91dHB1dEN0eDogT3V0cHV0Q29udGV4dCwgY29tcDogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhKTogQ29tcGlsZWRTdHlsZXNoZWV0IHtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGNvbXAudGVtcGxhdGUgITtcbiAgICByZXR1cm4gdGhpcy5fY29tcGlsZVN0eWxlcyhcbiAgICAgICAgb3V0cHV0Q3R4LCBjb21wLCBuZXcgQ29tcGlsZVN0eWxlc2hlZXRNZXRhZGF0YSh7XG4gICAgICAgICAgc3R5bGVzOiB0ZW1wbGF0ZS5zdHlsZXMsXG4gICAgICAgICAgc3R5bGVVcmxzOiB0ZW1wbGF0ZS5zdHlsZVVybHMsXG4gICAgICAgICAgbW9kdWxlVXJsOiBpZGVudGlmaWVyTW9kdWxlVXJsKGNvbXAudHlwZSlcbiAgICAgICAgfSksXG4gICAgICAgIHRoaXMubmVlZHNTdHlsZVNoaW0oY29tcCksIHRydWUpO1xuICB9XG5cbiAgY29tcGlsZVN0eWxlcyhcbiAgICAgIG91dHB1dEN0eDogT3V0cHV0Q29udGV4dCwgY29tcDogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLFxuICAgICAgc3R5bGVzaGVldDogQ29tcGlsZVN0eWxlc2hlZXRNZXRhZGF0YSxcbiAgICAgIHNoaW06IGJvb2xlYW4gPSB0aGlzLm5lZWRzU3R5bGVTaGltKGNvbXApKTogQ29tcGlsZWRTdHlsZXNoZWV0IHtcbiAgICByZXR1cm4gdGhpcy5fY29tcGlsZVN0eWxlcyhvdXRwdXRDdHgsIGNvbXAsIHN0eWxlc2hlZXQsIHNoaW0sIGZhbHNlKTtcbiAgfVxuXG4gIG5lZWRzU3R5bGVTaGltKGNvbXA6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjb21wLnRlbXBsYXRlICEuZW5jYXBzdWxhdGlvbiA9PT0gVmlld0VuY2Fwc3VsYXRpb24uRW11bGF0ZWQ7XG4gIH1cblxuICBwcml2YXRlIF9jb21waWxlU3R5bGVzKFxuICAgICAgb3V0cHV0Q3R4OiBPdXRwdXRDb250ZXh0LCBjb21wOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsXG4gICAgICBzdHlsZXNoZWV0OiBDb21waWxlU3R5bGVzaGVldE1ldGFkYXRhLCBzaGltOiBib29sZWFuLFxuICAgICAgaXNDb21wb25lbnRTdHlsZXNoZWV0OiBib29sZWFuKTogQ29tcGlsZWRTdHlsZXNoZWV0IHtcbiAgICBjb25zdCBzdHlsZUV4cHJlc3Npb25zOiBvLkV4cHJlc3Npb25bXSA9XG4gICAgICAgIHN0eWxlc2hlZXQuc3R5bGVzLm1hcChwbGFpblN0eWxlID0+IG8ubGl0ZXJhbCh0aGlzLl9zaGltSWZOZWVkZWQocGxhaW5TdHlsZSwgc2hpbSkpKTtcbiAgICBjb25zdCBkZXBlbmRlbmNpZXM6IFN0eWxlc0NvbXBpbGVEZXBlbmRlbmN5W10gPSBbXTtcbiAgICBzdHlsZXNoZWV0LnN0eWxlVXJscy5mb3JFYWNoKChzdHlsZVVybCkgPT4ge1xuICAgICAgY29uc3QgZXhwckluZGV4ID0gc3R5bGVFeHByZXNzaW9ucy5sZW5ndGg7XG4gICAgICAvLyBOb3RlOiBUaGlzIHBsYWNlaG9sZGVyIHdpbGwgYmUgZmlsbGVkIGxhdGVyLlxuICAgICAgc3R5bGVFeHByZXNzaW9ucy5wdXNoKG51bGwhKTtcbiAgICAgIGRlcGVuZGVuY2llcy5wdXNoKG5ldyBTdHlsZXNDb21waWxlRGVwZW5kZW5jeShcbiAgICAgICAgICBnZXRTdHlsZXNWYXJOYW1lKG51bGwpLCBzdHlsZVVybCxcbiAgICAgICAgICAodmFsdWUpID0+IHN0eWxlRXhwcmVzc2lvbnNbZXhwckluZGV4XSA9IG91dHB1dEN0eC5pbXBvcnRFeHByKHZhbHVlKSkpO1xuICAgIH0pO1xuICAgIC8vIHN0eWxlcyB2YXJpYWJsZSBjb250YWlucyBwbGFpbiBzdHJpbmdzIGFuZCBhcnJheXMgb2Ygb3RoZXIgc3R5bGVzIGFycmF5cyAocmVjdXJzaXZlKSxcbiAgICAvLyBzbyB3ZSBzZXQgaXRzIHR5cGUgdG8gZHluYW1pYy5cbiAgICBjb25zdCBzdHlsZXNWYXIgPSBnZXRTdHlsZXNWYXJOYW1lKGlzQ29tcG9uZW50U3R5bGVzaGVldCA/IGNvbXAgOiBudWxsKTtcbiAgICBjb25zdCBzdG10ID0gby52YXJpYWJsZShzdHlsZXNWYXIpXG4gICAgICAgICAgICAgICAgICAgICAuc2V0KG8ubGl0ZXJhbEFycihcbiAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZUV4cHJlc3Npb25zLCBuZXcgby5BcnJheVR5cGUoby5EWU5BTUlDX1RZUEUsIFtvLlR5cGVNb2RpZmllci5Db25zdF0pKSlcbiAgICAgICAgICAgICAgICAgICAgIC50b0RlY2xTdG10KG51bGwsIGlzQ29tcG9uZW50U3R5bGVzaGVldCA/IFtvLlN0bXRNb2RpZmllci5GaW5hbF0gOiBbXG4gICAgICAgICAgICAgICAgICAgICAgIG8uU3RtdE1vZGlmaWVyLkZpbmFsLCBvLlN0bXRNb2RpZmllci5FeHBvcnRlZFxuICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgb3V0cHV0Q3R4LnN0YXRlbWVudHMucHVzaChzdG10KTtcbiAgICByZXR1cm4gbmV3IENvbXBpbGVkU3R5bGVzaGVldChvdXRwdXRDdHgsIHN0eWxlc1ZhciwgZGVwZW5kZW5jaWVzLCBzaGltLCBzdHlsZXNoZWV0KTtcbiAgfVxuXG4gIHByaXZhdGUgX3NoaW1JZk5lZWRlZChzdHlsZTogc3RyaW5nLCBzaGltOiBib29sZWFuKTogc3RyaW5nIHtcbiAgICByZXR1cm4gc2hpbSA/IHRoaXMuX3NoYWRvd0Nzcy5zaGltQ3NzVGV4dChzdHlsZSwgQ09OVEVOVF9BVFRSLCBIT1NUX0FUVFIpIDogc3R5bGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0U3R5bGVzVmFyTmFtZShjb21wb25lbnQ6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YXxudWxsKTogc3RyaW5nIHtcbiAgbGV0IHJlc3VsdCA9IGBzdHlsZXNgO1xuICBpZiAoY29tcG9uZW50KSB7XG4gICAgcmVzdWx0ICs9IGBfJHtpZGVudGlmaWVyTmFtZShjb21wb25lbnQudHlwZSl9YDtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuIl19