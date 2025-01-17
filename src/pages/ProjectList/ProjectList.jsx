import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { handler } from "tailwindcss-animate";
import ProjectCard from "../Project/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/Redux/Store";
import { fetchProjects, searchProjects } from "@/Redux/Project/Action";

export const tags = [
  "All",
  "ReactJs",
  "NextJs",
  "Spring Boot",
  "MySQL",
  "MongoDB",
  "AngularJs",
  "Python",
  "Flask",
  "Django",
];

const ProjectList = () => {
  const dispatch = useDispatch();
  const { project } = useSelector((store) => store);
  const [keyword, setKeywod] = useState("");
  const handleSearchChange = (e) => {
    setKeywod(e.target.value);
    dispatch(searchProjects(e.target.value));
  };

  useEffect(() => {
    dispatch(fetchProjects({}));
  }, []);

  const handleFilterTag = (value) => {
    
    if (value == "All") {
      dispatch(fetchProjects({}));
    } else {
      dispatch(fetchProjects({ tag: value }));
    }
  };
  const handleFilterCategory = (value) => {
    if (value == "all") {
      dispatch(fetchProjects({}));
    } else {
      dispatch(fetchProjects({ category: value }));
    }
  };
  return (
    <>
      <div className="relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5">
        <section className="filterSection">
          <Card className="p-5 sticky top-10">
            <div className="flex justify-between lg:w-[20rem]">
              <p className="text-x1 tracking-wider">Filters</p>
              <Button variant="ghost" size="icon">
                <MixerHorizontalIcon />
              </Button>
            </div>
            <CardContent className="mt-5 ">
              <ScrollArea className="space-y-7 h-[70vh] overflow-y-auto">
                <div>
                  <h1 className="pb-3 text-gray-400 border-b">Category</h1>
                  <div className="pt-5">
                    <RadioGroup
                      className="space-y-3 pt-5"
                      defaultValue="all"
                      onValueChange={(value) => handleFilterCategory(value)}
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="all" id="r1" />
                        <Label htmlFor="r1">All</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="Fullstack" id="r2" />
                        <Label htmlFor="r2">Fullstack</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="Backend" id="r3" />
                        <Label htmlFor="r3">Backend</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="Frontend" id="r4" />
                        <Label htmlFor="r4">Frontend</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="pt-9">
                  <h1 className="pb-3 text-gray-400 border-b">Tag</h1>
                  <div className="pt-5">
                    <RadioGroup
                      className="space-y-3 pt-5"
                      defaultValue="All"
                      onValueChange={(value) => handleFilterTag(value)}
                    >
                      {tags.map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <RadioGroupItem value={item} id={`r1-${item}`} />
                          <Label htmlFor={`r1-${item}`}>{item}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>
        <section className="projectListSection w-full lg:w-[48rem]">
          <div className="flex gap-2 items-center pb-5 justify-between">
            <div className="relative p-0 w-full">
              <Input
                onChange={handleSearchChange}
                placeholder="Search project"
                className="40% px-9"
              />
              <MagnifyingGlassIcon className="absolute top-3 left-4" />
            </div>
          </div>

          <div>
            <div className="space-y-5 min-h-[74vh]">
              {keyword
                ? project.searchProject?.map((item, index) => (
                    <ProjectCard item={item} key={item.id * index} />
                  ))
                : project.projects?.map((item) => (
                    <ProjectCard key={item.id} item={item} />
                  ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectList;
