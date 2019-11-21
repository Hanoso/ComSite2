#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time : 2019/11/10 22:40 
# @Author : hanoso
# @File : procity.py 
# @Software: PyCharm
import json
from comsite.settings import BASE_DIR

# 所需数据格式
procity = [
    {"id": 24, "name": "广东", "children": [{"id": 7, "name": "广州", "children": [{"id": 1, "name": "城区1"}]}]}
]

procities_example = [
    {"id": 0, "name": "省份", "children": [{"id": 0, "name": "城市", "children": [{"id": 0, "name": "城区"}]}]},
    {'id': 1, 'name': '北京市', 'children': {'id': 1, 'name': '市辖区', 'children': {'id': 16, 'name': '延庆区'}}}
]

procities = []

# 读取json数据
with open(BASE_DIR+"/static/layui/china_city_name_20190410112328.json", "r", encoding='utf-8') as f:
    lines = f.readlines()
    datas = ""
    for line in lines:
        line.strip()
        datas +=line
    datas = json.loads(datas)
    # print(type(datas), len(datas), datas[0])
    # print(datas[0]["pro_name"], datas[0]["pro_id"], datas[0]["pro_cities"])
    for pro_data in datas[:]:
        one_pro = {}
        one_pro["id"], one_pro["name"] = pro_data["pro_id"], pro_data["pro_name"]
        one_pro["children"] = []
        for city_data in pro_data["pro_cities"]:
            one_city = {}
            one_city["id"], one_city["name"] = city_data["city_id"], city_data["city_name"]
            one_city["children"] = []
            for dist_data in city_data["city_areas"]:
                one_dist = {}
                one_dist["id"], one_dist["name"] = dist_data["area_id"], dist_data["area_name"]
                one_city["children"].append(one_dist)
            one_pro["children"].append(one_city)

        procities.append(one_pro)
        
    # print(procities)
    # print(json.dumps(procities, ensure_ascii=False))


def get_city(one_pro_id, one_city_id, one_dist_id):
    with open(BASE_DIR+"/static/layui/citydata.json", "r", encoding='utf-8') as f:
        pc = f.readlines()
        cts = ""
        for line in pc:
            line.strip()
            cts += line
        cts = json.loads(cts)
        pro = ""
        city = ""
        dist = ""
        for pro_data in cts:
            if pro_data["id"] == one_pro_id:
                pro = pro_data["name"]
                for city_data in pro_data["children"]:
                    if city_data["id"] == one_city_id:
                        city = city_data["name"]
                        for dist_data in city_data["children"]:
                            if dist_data["id"] == one_dist_id:
                                dist = dist_data["name"]
    
        link_city = ""
        if city == "市辖区":
            city = pro
        print(pro, city, dist)
        return pro, city, dist
        

# get_city(1,1,3)