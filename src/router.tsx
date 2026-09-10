import { createRouter, createHashHistory } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    // GitHub Pages = statik dosya sunucusu: history API fallback yok.
    // Hash history ile /#/hafta/3 gibi alt sayfalar 404 vermeden açılır.
    history: createHashHistory(),
  });
}
