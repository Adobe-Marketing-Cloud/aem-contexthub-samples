#!/bin/bash

cat << EOF | ../../../extras/aem-configjson-escape/configjson-escape
{
    "title": "Generic Renderer",
    "icon": "coral-Icon--targeted",
    "storeMapping": {
        "x": "01-session-store"
    },
    "template": "<p>Generic Renderer</p><p>{{x.name}}, {{x.age}}</p>",
    "clickable": false
}
EOF
