#!/bin/bash

#Display current branch commit's
log_commits (){
  commit_range=$(git rev-list --simplify-by-decoration -2 HEAD | tr "\n" " " | sed "s/ *$//g" | sed "s/ /.../g") && git log $commit_range   
}

get_branch_commit_affected_files (){
  commit_range=$(git rev-list --simplify-by-decoration -2 HEAD | tr "\n" " " | sed "s/ *$//g" | sed "s/ /.../g") && git log --pretty=format:"" --name-only $commit_range | grep . 
}

get_current_affected_files (){
    git status -u --porcelain | sed 's/^...//' | sort | uniq
}

get_all_affected_files () {
    printf "$(get_branch_commit_affected_files)\n$(get_current_affected_files)" | tr -d "\n" | sort | uniq
}

get_all_affected_files