namespace MebelOnline.Server.Mappings
{
    public interface IMappingService<TSource, TTarget>
    {
        TTarget Map(TSource source);
        IList<TTarget> MapList(IList<TSource> source);
    }
}
