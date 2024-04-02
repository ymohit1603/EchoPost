import { createBlogInput, updateBlogInput } from "@mohit1033/medium-common";
import {  PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { Hono } from "hono";
import { sign ,verify} from "hono/jwt";



export const bookRouter = new Hono<
{
  Bindings: {
    JWT_SECRET: string
    DATABASE_URL:string
  }
  Variables:{
    userId:string
  }
}
>()


bookRouter.use("/*",async (c,next)=>{
    const header=c.req.header("Authorization")||"";

  if (header == "") {
    c.status(403);
      return c.json({
        message:"Empty header"
      })
    }
  
    // const token=header.split(" ")[1]
  else{
    try{

      const response=await verify(header,c.env.JWT_SECRET);
      if(!response){
        c.status(403);
        return c.json({error:"unauthorized"})
      }
      else{
        c.set("userId",response.id)
        await next();
      }
    }catch(e){
      c.status(403);
      return c.json({
         error:"You are not logged in"
      })
    }
  
  }
   
  })


bookRouter.post('/',async (c) => {
   const body=await c.req.json();
   const {success}=createBlogInput.safeParse(body);
   if(!success){
    c.status(411);
    return c.json({
      message:"Inputs not correct"
    })
   }
   const authorId=c.get("userId");
   const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
   }).$extends(withAccelerate())


  const blog= await prisma.blog.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:authorId
        }
   })
   return c.json({
    id:blog.id
   }) 

  })
  
bookRouter.put('/',async (c)=>{
    const body=await c.req.json();
  const {success}=updateBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"Inputs not correct"
      })
     }
    const authorId=c.get("userId");
   const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
   }).$extends(withAccelerate())


  const blog= await prisma.blog.update({
        where:{
            id: body.id
        },
        data:{
            title:body.title,
            content:body.content,
            authorId:authorId
                }
   })
   return c.json({
    id:blog.id
   }) 
  })
  
bookRouter.get('/:id',async (c)=>{
    const body=await c.req.json();
   const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
   }).$extends(withAccelerate())


   try{
       const blog= await prisma.blog.findFirst({
           where:{
               id:body.id
         },
         select: {
           id:true,
           title: true,
           content: true,
           author: {
             select: {   
               name:true
              }
           }
         }
         
        })


        return c.json({
            blog
        });
    }catch(e){
        c.status(411);
        return c.json({
            message:"Error while fetching blog post"
        }
    );

    }
});


  bookRouter.get('/',async (c)=>{
   const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
   }).$extends(withAccelerate())

    const blogs = await prisma.blog.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name:true
          }
        }
     }
   });
   return c.json({
    blogs
   })
  })
