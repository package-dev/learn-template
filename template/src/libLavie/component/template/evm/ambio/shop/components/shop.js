import React from "react";
import {
    Block,
    PermissionNavigationButton,
    Group,
    Note,
    PermissionInfoRow,
    List,
    NavigationButton,
    NavigationButtonLayout
} from "@uiCore";
import PropTypes from 'prop-types';
import {log} from "@lib/debug";
import {navigate} from "@lib/rootNavigation";
import {getUserInfo} from "@serviceUser";
import {LIGHT} from "@uiCore/Theme/colors";
import {isFunction} from "underscore";
