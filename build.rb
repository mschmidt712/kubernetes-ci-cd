require 'yaml'
yml = YAML.load_file('docs.yml')

@parts.each do |key, item|
  puts key
end
