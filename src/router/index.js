import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Livros from '@/components/Livros'
import Sentenca from '@/components/Sentenca'
import Capitulos from '@/components/Capitulos'
import Versiculos from '@/components/Versiculos'
import BannersRoutes from '@/components/Banners'

import { ROUTER_VIEW_HOME } from '@/router-view-names'
import { HOME, CAPITULOS, VERSICULOS, LIVROS, SENTENCA } from '@/paths'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [].concat(
    BannersRoutes,
    [
      {
        path: HOME.path,
        name: HOME.name,
        component: Home,
        children: [
          {
            path: LIVROS.path,
            name: LIVROS.name,
            components: {
              [ROUTER_VIEW_HOME]: Livros
            },
            children: [
              {
                path: CAPITULOS.path,
                name: CAPITULOS.name,
                components: {
                  capitulos: Capitulos
                },
                children: [
                  {
                    path: VERSICULOS.path,
                    name: VERSICULOS.name,
                    components: {
                      versiculos: Versiculos
                    }
                  }
                ]
              }
            ]
          },
          {
            path: SENTENCA.path,
            name: SENTENCA.name,
            components: {
              home: Sentenca
            }
          }
        ]
      }
    ]
  )
})
