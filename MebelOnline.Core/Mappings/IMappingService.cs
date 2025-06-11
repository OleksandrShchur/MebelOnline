namespace MebelOnline.Core.Mappings
{
    public interface IMappingService<TSource, TTarget>
    {
        TTarget Map(TSource source);

        public IList<TTarget> MapList(IList<TSource> source)
        {
            if (source == null)
            {
                return new List<TTarget>();
            }

            var mappedList = new List<TTarget>();
            foreach (var item in source)
            {
                mappedList.Add(Map(item));
            }

            return mappedList;
        }
    }
}
