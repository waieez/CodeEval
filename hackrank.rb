#Sherlock and Queries
#Making sure my JS implementation fails only because of the way JS handles large integers
#ruby syntax so silky smooth

arr = [];

ARGF.each do |line|
    arr << line
end

rA = arr[1].split(" ")
rB = arr[2].split(" ")
rC = arr[3].split(" ")


def sQ2 (rA, set)
	rA.unshift("0")
  length = rA.length
  
  set.each do |key,val|
    key = key.to_i
    count = key
    while count < length do
      rA[count] = (rA[count].to_i * val) % 1000000007
      count += key
    end
  end
  rA.shift
  rA
end

def createSet (rB, rC)
	set = {}
  (0...(rC.length)).each do |x|
    val = rB[x]
    if (set.has_key?(val))
      set[val] = (set[val] * rC[x].to_i) % 1000000007
    else
      set[val] = rC[x].to_i
    end
  end
  set
end

set = createSet(rB, rC)
rA = sQ2(rA, set)

puts rA.join(" ")