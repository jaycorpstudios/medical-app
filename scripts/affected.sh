#!/bin/bash

merge_base=$(git merge-base development $(git rev-parse --abbrev-ref HEAD))
head=$(git rev-parse HEAD)

#Display current branch commit's
log_commits (){
  commit_range=$(git rev-list --simplify-by-decoration -2 HEAD | tr "\n" " " | sed "s/ *$//g" | sed "s/ /.../g") && git log $commit_range --oneline
}

get_branch_commit_affected_files (){
  commit_range=$(git rev-list --simplify-by-decoration -2 HEAD | tr "\n" " " | sed "s/ *$//g" | sed "s/ /.../g")
  if [ ! -z $commit_range ]; then
    git log --pretty=format:"" --name-only $commit_range | grep . 
  fi
}

get_current_affected_files (){
    git diff --name-only --cached | sort | uniq
}

get_all_affected_files () {
    printf "$(get_branch_commit_affected_files)\n$(get_current_affected_files)" | sort | uniq
}

if [ "$merge_base" = "$head" ]; then
  get_current_affected_files
else
  get_all_affected_files
fi