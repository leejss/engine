
base_dir=./src/
name=$1



if [ -z $name ]; then
    echo "Usage: $0 <name>"
    exit 1
fi


path="$base_dir/$name"

if [ -d $path ]; then
    echo "Error: $path already exists"
    exit 1
fi


mkdir $path
cd $path

# Name.ts
echo "export default class ${name} {}" > ${name}.ts

# Name.test.ts
echo "import ${name} from \"./${name}\"; 
import { describe, beforeEach, test, expect, vi } from \"vitest\";" > ${name}.test.ts


# index.ts
echo "export { default as ${name} } from \"./${name}\"" > index.ts


# Upate ./src/index.ts
cd .. 
echo "export * from \"./${name}\";" >> index.ts