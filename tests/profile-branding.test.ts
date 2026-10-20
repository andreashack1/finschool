import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';

function sources(dir:string):string[]{return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?sources(path.join(dir,e.name)):/\.tsx?$/.test(e.name)?[path.join(dir,e.name)]:[]);}
describe('SimLife visible copy and stable technical routes',()=>{
  it('contains no legacy product name in JSX text or explanatory string literals',()=>{
    const stale:string[]=[];
    for(const name of [...sources('app'),...sources('src')]){
      const source=readFileSync(name,'utf8'),ast=ts.createSourceFile(name,source,ts.ScriptTarget.Latest,true,name.endsWith('.tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
      function visit(node:ts.Node){
        if(ts.isJsxText(node)||ts.isStringLiteral(node)||ts.isNoSubstitutionTemplateLiteral(node)){
          const text=node.text,attribute=ts.isJsxAttribute(node.parent)?node.parent.name.getText(ast):'';
          const technical=['className','id','href','aria-labelledby','aria-describedby'].includes(attribute)||text==='simulator'||/^(?:[./]|https?:)/.test(text)
            || (ts.isCallExpression(node.parent)&&node.parent.expression.getText(ast).startsWith('console.'));
          if(!technical&&/\bsimulator(?:ului|ul)?\b/iu.test(text))stale.push(`${name}: ${text.slice(0,130)}`);
        }
        ts.forEachChild(node,visit);
      }
      visit(ast);
      expect(source,name).not.toMatch(/\/SimLife\b|SimLife_(?:completion|events)|SimLife-app/);
    }
    expect(stale).toEqual([]);
  });
  it('keeps /simulator navigation while naming the feature SimLife',()=>{
    for(const file of ['app/finly-client.tsx','app/components/learning-ui.tsx','app/simulator/simulator-client.tsx','app/despre/page.tsx']){
      const source=readFileSync(file,'utf8');expect(source).toContain('/simulator');expect(source).toContain('SimLife');
    }
    expect(readFileSync('app/simulator/page.tsx','utf8')).toContain("title: 'SimLife · Finly'");
  });
});
