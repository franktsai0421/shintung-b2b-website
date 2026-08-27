import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

test("visitor mode has a public bilingual entry", () => {
  assert.match(pageSource, /type UserRole = "visitor"/);
  assert.match(pageSource, /Tham quan website/);
  assert.match(pageSource, /訪客參觀/);
  assert.match(pageSource, /onClick={enterVisitorMode}/);
});

test("visitor mode does not render commercial or ordering surfaces", () => {
  assert.match(pageSource, /!isVisitor && view === "cart"/);
  assert.match(pageSource, /!isVisitor && view === "account"/);
  assert.match(pageSource, /!admin && !isVisitor && cartItems\.length/);
  assert.match(pageSource, /!isVisitor && <button className="primary" onClick={add}>/);
  assert.match(pageSource, /canOrder={!isVisitor}/);
});

test("visitor product details retain specifications and carton quantity", () => {
  assert.match(pageSource, /open={isVisitor}/);
  assert.match(pageSource, /p\.specifications\.map/);
  assert.match(pageSource, /1 \{t\("thùng", "箱"\)\} = \{packQty\} pcs/);
});
