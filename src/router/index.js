import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/home';
import Login from '@/components/login';
import RegisterPage from '@/components/register';
import ForgetPwd from  '@/components/forgetPwd'
import RetrievePwdEmail from  '@/components/retrievePwdEmail'



import CompanyHome from '@/components/company/home';
import PersonalHome from '@/components/personal/home';

import Staff from '@/components/company/staffEnter';
import Project from '@/components/company/Project';
import InfoMaintenance from '@/components/company/infoMaintenance';

import Email from '@/components/company/email';
import Register from '@/components/company/register';


import MyTesk from '@/components/personal/myTesk';
import MyTeskList from '@/components/personal/myTesk/list';
import MyTeskPublish from '@/components/personal/myTesk/publish';
import MyProject from '@/components/personal/myProject';
import MyFile from '@/components/personal/myFile';
import H5share from '@/components/personal/myTesk/h5share';
import SetNumber from '@/components/personal/setNumber';

import Search from '@/components/personal/search';
import SharePage from '@/components/sharePage';
import StyleTwo from '@/components/styleTwo';
// { path: '*', component: NotFoundComponent }

Vue.use(Router);
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage
    },
    {
      path: '/forgetPwd',
      name: 'ForgetPwd',
      component: ForgetPwd
    },
    {
      path: '/retrievePwdEmail',
      name: 'RetrievePwdEmail',
      component: RetrievePwdEmail
    },

    {
      path: '/personalHome',
      name: 'PersonalHome',
      component: PersonalHome,
      children: [
        {
          path: '/myTesk',
          name: 'MyTesk',
          component: MyTesk,
          children: [
            {
              path: '/myTesk/myTeskList',
              name: 'MyTeskList',
              component: MyTeskList,
            }, {
              path: '/myTesk/myTeskPublish',
              name: 'MyTeskPublish',
              component: MyTeskPublish,
            }, {
              path: '/myTesk/H5share',
              name: 'H5share',
              component: H5share,
            }
          ]
        }, {
          path: '/myProject',
          name: 'MyProject',
          component: MyProject
        }, {
          path: '/myFile',
          name: 'MyFile',
          component: MyFile
        }, {
          path: '/search',
          name: 'Search',
          component: Search
        },{
          path: '/setNumber',
          name: 'SetNumber',
          component: SetNumber
        }
      ]

    },
    {
      path: '/sharePage',
      name: 'SharePage',
      component: SharePage
    },
    {
      path: '/styleTwo',
      name: 'StyleTwo',
      component: StyleTwo
    },
    {
      path: '/companyHome',
      name:
        'CompanyHome',
      component:
      CompanyHome,
      children:
        [
          {
            path: '/staff',
            name: 'Staff',
            component: Staff
          }, {
          path: '/project',
          name: 'Project',
          component: Project
        }, {
          path: '/infoMaintenance',
          name: 'InfoMaintenance',
          component: InfoMaintenance
        }
        ]
    }
    ,
    {
      path: '/email',
      name:
        'Email',
      component:
      Email
    }
    ,
    {
      path: '/register',
      name:
        'Register',
      component:
      Register
    }
  ]
})
