# app/routers/docs.py
from fastapi import APIRouter
import os 
import frontmatter 

router = APIRouter(prefix="/api/docs", tags=["docs"])

'''
slug 是文档的稳定标识
order 用于排序
title 用于在左侧显示 
'''
@router.get("/")
async def get_docs_metadata():
    d = "./content/docs/"
    files = os.listdir(d)
    fms = []
    for file in files:
        with open(d+file, 'r', encoding="utf-8") as f:
            fm = frontmatter.load(f)
        fms.append(fm.metadata)
    return fms

@router.get("/{slug}")
async def get_docs_by_slug(slug):
    d = "./content/docs/"
    files = os.listdir(d)
    fms = []
    for file in files:
        with open(d+file, 'r', encoding="utf-8") as f:
            fm = frontmatter.load(f)
        if fm.metadata['slug'] == slug:
            return fm.content 