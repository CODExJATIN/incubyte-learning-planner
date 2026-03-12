class StringCalculator
  def self.add(input)
    return 0 if input.empty?

    delimiter = /,|\n/

    if input.start_with?('//')
      header, input = input.split("\n", 2)
      custom_delimiter = header[2..]
      delimiter = Regexp.new(Regexp.escape(custom_delimiter))
    end

    numbers = input.split(delimiter).map(&:to_i)

    negatives = numbers.select(&:negative?)
    raise "negative numbers not allowed: #{negatives.join(', ')}" if negatives.any?

    numbers.sum
  end
end